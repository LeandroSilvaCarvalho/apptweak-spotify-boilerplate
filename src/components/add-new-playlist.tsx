import { FC, useState } from "react";
import { Button, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { createPlaylist } from "../containers/playlists/slice";
import { useDispatch } from "react-redux";

interface PlayList {
  name: string;
  description?: string;
}

const AddPlaylist: FC = () => {
  const dispatch = useDispatch();

  const [playList, setPlayList] = useState<PlayList>({ name: "", description: "" });

  const onCreatePlaylist = () => {
    dispatch(createPlaylist(playList));
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayList({ ...playList, name: e.target.value });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayList({ ...playList, description: e.target.value });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" style={{ cursor: "pointer" }}>
          Add playlist
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Add new playlist</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new playlist to your Spotify account.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" mb="1" weight="bold">
              Playlist name
            </Text>
            <TextField.Root placeholder="Enter your playlist name" onChange={onNameChange} />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Playlist description
            </Text>
            <TextArea
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
              disabled={!playList.name}
              onClick={onCreatePlaylist}
            >
              Create
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddPlaylist;
