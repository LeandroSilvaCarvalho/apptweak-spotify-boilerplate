import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylists, selectSelectedPlaylist } from "../containers/playlists/selectors";
import { getPlaylists, setSelectedPlaylist } from "../containers/playlists/slice";
import { Flex, Select } from "@radix-ui/themes";
import { getPlaylistTracks } from "../containers/playlistTracks/slice";

const SelectPlaylist: FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const onSelectPlaylist = (playlistId: string) => {
    dispatch(getPlaylistTracks(playlistId));
    const selectedPlaylist = playlists.find((playlist) => playlist.id === playlistId);
    dispatch(setSelectedPlaylist(selectedPlaylist));
  };

  useEffect(() => {
    dispatch(getPlaylists());
  }, []);

  return (
    <Flex direction="column" width="250px">
      <Select.Root size="3" value={selectedPlaylist?.id || ""} onValueChange={onSelectPlaylist}>
        <Select.Trigger placeholder="Select a playlist" />
        <Select.Content position="popper">
          {playlists.map((playlist) => (
            <Select.Item value={playlist.id} key={playlist.id}>
              {playlist.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default SelectPlaylist;
