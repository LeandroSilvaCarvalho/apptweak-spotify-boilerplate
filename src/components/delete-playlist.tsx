import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, setSelectedPlaylist } from "../containers/playlists/slice";

const DeletePlaylist: FC = () => {
  const dispatch = useDispatch();
  const playlist = useSelector(selectSelectedPlaylist);

  if (!playlist) return null;

  const onDeletePlaylist = () => {
    dispatch(
      deletePlaylist({
        playlistId: playlist.id
      })
    );
    dispatch(setSelectedPlaylist(undefined));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text size="3" style={{ cursor: "pointer" }}>
          Delete the playlist
        </Text>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title align="center">Delete your playlist</Dialog.Title>
        <Dialog.Description align="center" size="2" mb="4">
          Are you sure you want to delete <Text weight="bold">{`"${playlist.name}"`}</Text> from
          your playlists?
        </Dialog.Description>

        <Flex gap="9" mt="6" justify="center">
          <Dialog.Close>
            <Button size="3" variant="soft" color="gray" style={{ cursor: "pointer" }}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button size="3" style={{ cursor: "pointer" }} onClick={onDeletePlaylist}>
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeletePlaylist;
