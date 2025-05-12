import { Flex } from "@radix-ui/themes";
import SelectPlaylist from "./select-playlist";
import PlaylistDescription from "./playlist-description";
import { FC } from "react";

const PlaylistSelector: FC = () => {
  return (
    <Flex direction="row" gap="5" align="center">
      <SelectPlaylist />
      <PlaylistDescription />
    </Flex>
  );
};

export default PlaylistSelector;
