import { FC } from "react";
import SearchTrack from "./search-track";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Track } from "../types/track";
import { RequestStatusType } from "../types/requests";

interface SearchTrackListProps {
  searchStatus: RequestStatusType;
  tracks: Track[];
}

const SearchTrackList: FC<SearchTrackListProps> = ({ searchStatus, tracks }) => {
  return (
    <Flex direction="column" gap="5">
      {tracks.length === 0 && searchStatus !== "idle" && searchStatus !== "pending" ? (
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
