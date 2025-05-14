import { FC } from "react";
import SearchTrack from "./search-track";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Track } from "../types/track";

interface SearchTrackListProps {
  tracks: Track[];
}

const SearchTrackList: FC<SearchTrackListProps> = ({ tracks }) => {
  return (
    <Flex direction="column" gap="5">
      {tracks.length === 0 ? (
        <Box>
          <Text color="gray">No results</Text>
        </Box>
      ) : (
        tracks.map((item) => <SearchTrack key={item.id} track={item} />)
      )}
    </Flex>
  );
};

export default SearchTrackList;
