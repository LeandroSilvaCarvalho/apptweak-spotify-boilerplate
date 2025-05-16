import "./App.css";

import { FC, ReactElement } from "react";

import PlaylistTracks from "./components/playlist-tracks";
import { Box, Flex } from "@radix-ui/themes";
import PlaylistSelector from "./components/playlist-selector";
import Search from "./components/search";
import AddPlaylist from "./components/add-new-playlist";
import NavBar from "./components/nav-bar";

const App: FC = (): ReactElement => {
  return (
    <Box pb="5">
      <Box maxWidth="1300px" mx="auto">
        <NavBar />
        <Flex direction="column" gap="9" mt="8">
          <Flex direction="row" gap="5" justify="between">
            <Search />
            <AddPlaylist />
          </Flex>
          <Flex direction="column" gap="5">
            <PlaylistSelector />
            <PlaylistTracks />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default App;
