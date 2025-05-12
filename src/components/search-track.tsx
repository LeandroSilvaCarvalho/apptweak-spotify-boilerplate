import { FC } from "react";
import { addTracksToPlaylist } from "../containers/playlistTracks/slice";
import { Avatar, Card, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { Track } from "@spotify/web-api-ts-sdk";

interface SearchTrackProps {
  track: Track;
}

const SearchTrack: FC<SearchTrackProps> = ({ track }: SearchTrackProps) => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const onAddToPlaylist = () => {
    if (!selectedPlaylist) return;
    console.log({ track });
    dispatch(addTracksToPlaylist({ playlistId: selectedPlaylist.id, track }));
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
        <Tooltip content={selectedPlaylist ? "Add to playlist" : "Select a playlist first"}>
          <IconButton
            radius="full"
            style={{ cursor: selectedPlaylist ? "pointer" : "not-allowed" }}
            onClick={onAddToPlaylist}
            disabled={!selectedPlaylist}
          >
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Flex>
    </Card>
  );
};

export default SearchTrack;
