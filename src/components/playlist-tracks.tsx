import { useSelector } from "react-redux";
import {
  selectPlaylistTracks,
  selectPlaylistTracksStatus
} from "../containers/playlistTracks/selectors";
import Track from "./track";
import { Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { RequestStatus } from "../types/requests";
import PlaylistTracksSkeleton from "./skeletons/playlist-tracks-skeleton";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { CardStackPlusIcon, DownloadIcon } from "@radix-ui/react-icons";

const PlaylistTracks: FC = () => {
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const playlistTracks = useSelector(selectPlaylistTracks);
  const playlistTracksStatus = useSelector(selectPlaylistTracksStatus);

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

  if (playlistTracks.length === 0) {
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
  return (
    <Flex direction="column" gap="5">
      {playlistTracks.map((playlistTrack, index) => {
        if (playlistTrack.track) {
          return (
            <div key={`${index}_${playlistTrack.track.id}`}>
              <Track track={playlistTrack.track} />
            </div>
          );
        }
        return null;
      })}
    </Flex>
  );
};

export default PlaylistTracks;
