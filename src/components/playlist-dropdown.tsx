import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton, Text } from "@radix-ui/themes";
import { FC, useState } from "react";
import EditPlaylist from "./edit-playlist";
import DeletePlaylist from "./delete-playlist";

const PlaylistDropdown: FC = () => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="soft" style={{ cursor: "pointer" }}>
            <DotsVerticalIcon width="18" height="18" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item onClick={() => setEditOpen(true)}>
            <Text size="3" style={{ cursor: "pointer" }}>
              Edit the playlist
            </Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={(e) => e.preventDefault()} color="red">
            <DeletePlaylist />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <EditPlaylist open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
};

export default PlaylistDropdown;
