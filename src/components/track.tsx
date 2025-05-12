import { Avatar, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { PlaylistTrack, removeTrackFromPlaylist } from "../containers/playlistTracks/slice";
import { FC } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";

interface TrackProps {
  track: PlaylistTrack["track"];
}

const Track: FC<TrackProps> = ({ track }: TrackProps) => {
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

        <Flex align="center" justify="start" style={{ flex: 3, whiteSpace: "nowrap" }}>
          <Text size="2">{track.album.release_date}</Text>
        </Flex>
        <Flex align="center" justify="center" style={{ flex: 1, whiteSpace: "nowrap" }}>
          <IconButton
            radius="large"
            style={{ cursor: "pointer" }}
            variant="ghost"
            color="gray"
            onClick={onRemoveFromPlaylist}
          >
            <TrashIcon color="red" height="24" width="24" />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Track;
