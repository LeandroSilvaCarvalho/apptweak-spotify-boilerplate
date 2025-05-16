import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { FC } from "react";
import EditPlaylist from "./edit-playlist";
import DeletePlaylist from "./delete-playlist";

const PlaylistDropdown: FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="soft" style={{ cursor: "pointer" }}>
          <DotsVerticalIcon width="18" height="18" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={(e) => e.preventDefault()}>
          <EditPlaylist />
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={(e) => e.preventDefault()} color="red">
          <DeletePlaylist />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default PlaylistDropdown;
