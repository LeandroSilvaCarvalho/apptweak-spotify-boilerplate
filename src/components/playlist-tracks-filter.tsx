import { FC } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { SortKey, SortOrder } from "../utils/sort-tracks.utils";

interface Column {
  key: SortKey;
  label: string;
  flex?: number;
}

interface TrackHeaderProps {
  columns: Column[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey) => void;
}

const SortableHeader: FC<{
  column: Column;
  order: SortOrder;
  onClick: () => void;
}> = ({ column, order, onClick }) => {
  const showLabel = column.label !== "";
  const icon =
    order === "asc" ? (
      <TriangleUpIcon width="20" height="20" color="gray" />
    ) : order === "desc" ? (
      <TriangleDownIcon width="20" height="20" color="gray" />
    ) : null;

  return (
    <Flex
      align="center"
      gap="1"
      onClick={onClick}
      style={{
        flex: column.flex ?? 1,
        cursor: showLabel ? "pointer" : "default"
      }}
    >
      {showLabel && (
        <>
          <Text size="2" style={{ textTransform: "uppercase" }} color="gray">
            {column.label}
          </Text>
          {icon}
        </>
      )}
    </Flex>
  );
};

const PlaylistTracksFilter: FC<TrackHeaderProps> = ({
  columns,
  sortKey,
  sortOrder,
  onSortChange
}) => {
  return (
    <Flex direction="row" gap="6" px="3">
      <Flex width="64px" align="center" justify="center">
        <Text color="gray">#</Text>
      </Flex>

      {columns.map((col) => (
        <SortableHeader
          key={col.key}
          column={col}
          order={sortKey === col.key ? sortOrder : undefined}
          onClick={() => onSortChange(col.key)}
        />
      ))}
    </Flex>
  );
};

export default PlaylistTracksFilter;
