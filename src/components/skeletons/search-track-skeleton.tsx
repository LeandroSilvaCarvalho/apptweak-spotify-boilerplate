import { Avatar, Card, Flex, Skeleton } from "@radix-ui/themes";
import { FC } from "react";

const SearchTrackSkeleton: FC = () => {
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

        <Skeleton>
          <Flex style={{ height: "32px", width: "32px" }} />
        </Skeleton>
      </Flex>
    </Card>
  );
};

export default SearchTrackSkeleton;
