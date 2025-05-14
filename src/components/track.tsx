import { Avatar, Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { removeTrackFromPlaylist } from "../containers/playlistTracks/slice";
import { FC } from "react";
import { DragHandleHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { DraggableAttributes } from "@dnd-kit/core";
import { formatDuration } from "../utils/time.utils";
import { Track as ITrack } from "../types/track";

interface TrackProps {
  track: ITrack;
  isEditable?: boolean;
  dragHandleProps?: DraggableAttributes;
}

const Track: FC<TrackProps> = ({ track, isEditable = false, dragHandleProps }: TrackProps) => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const onRemoveFromPlaylist = () => {
    if (!selectedPlaylist) return;
    dispatch(removeTrackFromPlaylist({ playlistId: selectedPlaylist.id, track }));
  };

  return (
    <Card>
      <Flex direction="row" align="center" gap="6">
        <Avatar
          fallback="T"
          src={track.album.images[0]?.url}
          alt={track.album.name}
          size="5"
          radius="small"
        />

        <Flex direction="column" justify="center" style={{ flex: 3, minWidth: 0 }}>
          <Text weight="bold" truncate>
            {track.name}
          </Text>
          <Text size="2" truncate>
            {track.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </Flex>

        <Flex align="center" style={{ flex: 3, minWidth: 0 }}>
          <Text truncate>{track.album.name}</Text>
        </Flex>

        <Flex align="center" justify="start" style={{ flex: 3 }}>
          <Text size="2">{track.album.release_date}</Text>
        </Flex>
        <Flex align="center" justify="start" style={{ flex: 1 }}>
          <Text size="2">{formatDuration(track.duration_ms)}</Text>
        </Flex>
        {isEditable && (
          <Flex
            align="center"
            justify={dragHandleProps ? "between" : "center"}
            style={{ flex: 1, whiteSpace: "nowrap" }}
          >
            <IconButton
              radius="large"
              style={{ cursor: "pointer" }}
              variant="ghost"
              color="gray"
              onClick={onRemoveFromPlaylist}
            >
              <TrashIcon color="red" height="24" width="24" />
            </IconButton>

            {dragHandleProps && (
              <Box {...dragHandleProps}>
                <DragHandleHorizontalIcon
                  color="gray"
                  height="34"
                  width="34"
                  style={{ cursor: "grab" }}
                />
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default Track;
