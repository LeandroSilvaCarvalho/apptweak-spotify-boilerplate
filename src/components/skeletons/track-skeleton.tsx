import { Avatar, Card, Flex, Skeleton } from "@radix-ui/themes";
import { FC } from "react";

const TrackSkeleton: FC = () => {
  return (
    <Card>
      <Flex direction="row" align="center" gap="6">
        <Skeleton>
          <Avatar size="5" radius="small" fallback="S" />
        </Skeleton>

        <Flex direction="column" justify="center" style={{ flex: 3, minWidth: 0 }}>
          <Skeleton>
            <Flex style={{ height: "20px", width: "200px" }} />
          </Skeleton>
          <Skeleton>
            <Flex style={{ height: "16px", width: "150px", marginTop: "4px" }} />
          </Skeleton>
        </Flex>

        <Flex align="center" style={{ flex: 3, minWidth: 0 }}>
          <Skeleton>
            <Flex style={{ height: "16px", width: "180px" }} />
          </Skeleton>
        </Flex>

        <Flex align="center" justify="start" style={{ flex: 3, whiteSpace: "nowrap" }}>
          <Skeleton>
            <Flex style={{ height: "16px", width: "100px" }} />
          </Skeleton>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TrackSkeleton;
