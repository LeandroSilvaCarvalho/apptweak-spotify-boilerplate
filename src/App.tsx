import "./App.css";

import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "./containers/auth/selectors";
import PlaylistTracks from "./components/playlist-tracks";
import { Flex } from "@radix-ui/themes";
import PlaylistSelector from "./components/playlist-selector";
import Search from "./components/search";
import AddPlaylist from "./components/add-new-playlist";

const App: FC = (): ReactElement => {
  const user = useSelector(selectUser);

  // TODO: You can access user data and now fetch user's playlists

  console.log({ user });
  return (
    <div className="App">
      <Flex direction="column" gap="9">
        <Flex direction="row" gap="5" justify="between">
          <Search />
          <AddPlaylist />
        </Flex>
        <Flex direction="column" gap="5">
          <PlaylistSelector />
          <PlaylistTracks />
        </Flex>
      </Flex>
    </div>
  );
};

export default App;
