import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaylistTracks,
  selectPlaylistTracksStatus
} from "../containers/playlistTracks/selectors";
import Track from "./track";
import { Flex, Text } from "@radix-ui/themes";
import { FC, useState, useEffect } from "react";
import { RequestStatus } from "../types/requests";
import PlaylistTracksSkeleton from "./skeletons/playlist-tracks-skeleton";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { CardStackPlusIcon, DownloadIcon } from "@radix-ui/react-icons";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { selectUser } from "../containers/auth/selectors";
import { reorderTracks } from "../containers/playlistTracks/slice";
import PlaylistTracksFilter, { SortKey, SortOrder } from "./playlist-tracks-filter";

interface SortableTrackProps {
  id: string;
  track: any;
  isEditable: boolean;
}

const SortableTrack: FC<SortableTrackProps> = ({ id, track, isEditable }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Track
        track={track}
        isEditable={isEditable}
        dragHandleProps={isEditable ? { ...listeners, ...attributes } : undefined}
      />
    </div>
  );
};

const PlaylistTracks: FC = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const playlistTracks = useSelector(selectPlaylistTracks);
  const playlistTracksStatus = useSelector(selectPlaylistTracksStatus);
  const user = useSelector(selectUser);

  const [sortedTracks, setSortedTracks] = useState(playlistTracks);
  const [sortKey, setSortKey] = useState<SortKey>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>(undefined);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!sortKey || !sortOrder) {
      setSortedTracks(playlistTracks);
      return;
    }

    const sorted = [...playlistTracks].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortKey) {
        case "title":
          aVal = a.track.name.toLowerCase();
          bVal = b.track.name.toLowerCase();
          break;
        case "album":
          aVal = a.track.album.name.toLowerCase();
          bVal = b.track.album.name.toLowerCase();
          break;
        case "releaseDate":
          aVal = new Date(a.track.album.release_date).getTime();
          bVal = new Date(b.track.album.release_date).getTime();
          break;
        case "duration":
          aVal = a.track.duration_ms;
          bVal = b.track.duration_ms;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortedTracks(sorted);
  }, [sortKey, sortOrder, playlistTracks]);

  const handleSortChange = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      setSortOrder((prev) => {
        if (prev === "asc") return "desc";
        if (prev === "desc") {
          setSortKey(undefined);
          return undefined;
        }
        return "asc";
      });
    }
  };

  const handleDragEnd = (event: any) => {
    if (!selectedPlaylist) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedTracks.findIndex((item, i) => `${i}_${item.track?.id}` === active.id);
    let newIndex = sortedTracks.findIndex((item, i) => `${i}_${item.track?.id}` === over.id);

    const newOrder = arrayMove(sortedTracks, oldIndex, newIndex);
    setSortedTracks(newOrder);

    if (newIndex > oldIndex) {
      newIndex += 1;
    }

    dispatch(
      reorderTracks({
        playlistId: selectedPlaylist?.id,
        rangeStart: oldIndex,
        insertBefore: newIndex
      })
    );
  };

  if (playlistTracksStatus === RequestStatus.PENDING) {
    return <PlaylistTracksSkeleton />;
  }

  if (!selectedPlaylist) {
    return (
      <Flex direction="column" align="center" gap="5">
        <CardStackPlusIcon height="50" width="50" color="gray" />
        <Text color="gray">Select a playlist</Text>
      </Flex>
    );
  }

  if (sortedTracks.length === 0) {
    return (
      <Flex direction="column" align="center" gap="8">
        <DownloadIcon height="50" width="50" color="gray" />
        <Flex direction="column" align="center" gap="4">
          <Text color="gray">No tracks in this playlist</Text>
          <Text color="gray" weight="bold">
            Search for a track and add it to the playlist
          </Text>
        </Flex>
      </Flex>
    );
  }

  const isEditable = selectedPlaylist.collaborative || selectedPlaylist.owner.id === user?.userId;

  const columns = [
    { key: "title", label: "Title", flex: 3 },
    { key: "album", label: "Album", flex: 3 },
    { key: "releaseDate", label: "Release date", flex: 3 },
    { key: "duration", label: "Duration", flex: 1 }
  ];

  if (isEditable) {
    columns.push({ key: "", label: "", flex: 1 });
  }

  return (
    <>
      <PlaylistTracksFilter
        columns={columns}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          disabled={!!sortKey}
          items={sortedTracks.map((item, index) => `${index}_${item.track?.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <Flex direction="column" gap="5">
            {sortedTracks.map((playlistTrack, index) => {
              if (playlistTrack.track) {
                const uniqueId = `${index}_${playlistTrack.track.id}`;
                return (
                  <SortableTrack
                    key={uniqueId}
                    id={uniqueId}
                    track={playlistTrack.track}
                    isEditable={isEditable}
                  />
                );
              }
              return null;
            })}
          </Flex>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default PlaylistTracks;
