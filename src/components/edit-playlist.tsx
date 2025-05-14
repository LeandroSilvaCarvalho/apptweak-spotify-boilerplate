import { Button, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../containers/playlists/selectors";

const EditPlaylist: FC = () => {
  const dispatch = useDispatch();
  const playlist = useSelector(selectSelectedPlaylist);

  if (!playlist) return null;

  const onCreatePlaylist = () => {};

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text size="3" style={{ cursor: "pointer" }}>
          Edit the playlist
        </Text>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Edit your playlist</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Edit your playlist details.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" mb="1" weight="bold">
              Playlist name
            </Text>
            <TextField.Root
              defaultValue={playlist.name}
              placeholder="Enter your playlist name"
              onChange={onNameChange}
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Playlist description
            </Text>
            <TextArea
              defaultValue={playlist.description}
              placeholder="Enter your playlist description (optional)"
              onChange={onDescriptionChange}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button size="3" variant="soft" color="gray" style={{ cursor: "pointer" }}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              size="3"
              style={{ cursor: "pointer" }}
              disabled={!playlist.name}
              onClick={onCreatePlaylist}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditPlaylist;
