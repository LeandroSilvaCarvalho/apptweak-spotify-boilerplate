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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { selectUser } from "../containers/auth/selectors";
import { reorderTracks } from "../containers/playlistTracks/slice";
import PlaylistTracksFilter from "./playlist-tracks-filter";
import { SortKey, SortOrder, sortTracks } from "../utils/sort-tracks.utils";

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
  const playlistTracks = useSelector(selectPlaylistTracks(selectedPlaylist?.id));

  const playlistTracksStatus = useSelector(selectPlaylistTracksStatus(selectedPlaylist?.id));

  const user = useSelector(selectUser);

  const [sortedTracks, setSortedTracks] = useState(playlistTracks);
  const [sortKey, setSortKey] = useState<SortKey>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>(undefined);
  const sensors = useSensors(useSensor(PointerSensor));

  const emptyPlaylist = playlistTracks.length === 0 && sortedTracks.length === 0;

  useEffect(() => {
    if (selectedPlaylist) {
      setSortedTracks(playlistTracks);
    }
  }, [playlistTracks, selectedPlaylist]);

  useEffect(() => {
    setSortedTracks(sortTracks(sortKey, sortOrder, playlistTracks));
  }, [sortKey, sortOrder]);

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

  const handleDragEnd = (event: DragEndEvent) => {
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

  if (playlistTracksStatus === RequestStatus.PENDING && emptyPlaylist) {
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

  if (emptyPlaylist) {
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
    { key: "releaseDate", label: "Release date", flex: 2 },
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
