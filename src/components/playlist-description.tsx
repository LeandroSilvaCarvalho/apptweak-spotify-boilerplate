import { useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { Text } from "@radix-ui/themes";
import { FC } from "react";

const PlaylistDescription: FC = () => {
  const playlist = useSelector(selectSelectedPlaylist);
  if (!playlist) {
    return null;
  }
  return <Text size="2" dangerouslySetInnerHTML={{ __html: playlist.description }} />;
};

export default PlaylistDescription;
