import { Flex } from "@radix-ui/themes";
import TrackSkeleton from "./track-skeleton";
import { FC } from "react";

const PlaylistTracksSkeleton: FC = () => {
  return (
    <div>
      <Flex direction="column" gap="5">
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
      </Flex>
    </div>
  );
};

export default PlaylistTracksSkeleton;
