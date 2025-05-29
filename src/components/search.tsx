import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, Popover, TextField } from "@radix-ui/themes";
import { FC, useState } from "react";
import { selectSearchTracks, selectSearchTracksStatus } from "../containers/search/selectors";
import { useDispatch, useSelector } from "react-redux";
import { searchTracks } from "../containers/search/slice";
import SearchTrackList from "./search-track-list";
import { useDebouncedCallback } from "../hooks/useDebounceCallback";

const Search: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const searchItems = useSelector(selectSearchTracks);
  const searchStatus = useSelector(selectSearchTracksStatus);
  const showPopover = searchValue.length > 0;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    dispatch(searchTracks(value));
  }, 500);

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOpen(value.length > 0);
    setSearchValue(value);
    if (value.length > 0) {
      debouncedSearch(value);
    }
  };
  const onOpenChange = (open: boolean) => {
    if (showPopover) {
      setOpen(open);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger>
        <Box maxWidth="500px" width="100%">
          <TextField.Root
            size="3"
            value={searchValue}
            onChange={changeSearchValue}
            placeholder="Search for a track..."
            style={{ width: "100%" }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </Popover.Trigger>

      {searchStatus !== "idle" && (
        <Popover.Content sideOffset={8} onOpenAutoFocus={(e) => e.preventDefault()}>
          <Flex direction="column" gap="5">
            <SearchTrackList tracks={searchItems.items} searchStatus={searchStatus} />
          </Flex>
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

export default Search;
