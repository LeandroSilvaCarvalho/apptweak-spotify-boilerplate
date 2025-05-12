import { useSelector } from "react-redux";
import {
  selectPlaylistTracks,
  selectPlaylistTracksStatus
} from "../containers/playlistTracks/selectors";
import Track from "./track";
import { Flex } from "@radix-ui/themes";
import { FC } from "react";
import { RequestStatus } from "../types/requests";
import PlaylistTracksSkeleton from "./skeletons/playlist-tracks-skeleton";

const PlaylistTracks: FC = () => {
  const playlistTracks = useSelector(selectPlaylistTracks);
  const playlistTracksStatus = useSelector(selectPlaylistTracksStatus);

  console.log({ playlistTracks });
  if (playlistTracksStatus === RequestStatus.PENDING) {
    return <PlaylistTracksSkeleton />;
  }

  return (
    <div>
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
    </div>
  );
};

export default PlaylistTracks;
