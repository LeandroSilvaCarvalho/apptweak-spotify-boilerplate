import { Flex } from "@radix-ui/themes";
import SelectPlaylist from "./select-playlist";
import PlaylistDescription from "./playlist-description";
import { FC } from "react";
import PlaylistDropdown from "./playlist-dropdown";
import { useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { selectUser } from "../containers/auth/selectors";

const PlaylistSelector: FC = () => {
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const user = useSelector(selectUser);
  const isCollaborative = selectedPlaylist?.collaborative;
  const isOwner = selectedPlaylist?.owner.id === user?.userId;
  const isEditable = isCollaborative || isOwner;

  return (
    <Flex direction="row" justify="between" align="center" gap="5">
      <Flex direction="row" gap="5" align="center">
        <SelectPlaylist />
        <PlaylistDescription />
      </Flex>

      {isEditable && <PlaylistDropdown />}
    </Flex>
  );
};

export default PlaylistSelector;
