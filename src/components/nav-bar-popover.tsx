import { Avatar, Flex, Popover, Text } from "@radix-ui/themes";
import { FC } from "react";
import { selectUser } from "../containers/auth/selectors";
import { useSelector } from "react-redux";
import ThemeToggle from "./theme-toggle";

const NavBarPopover: FC = () => {
  const user = useSelector(selectUser);

  if (!user) return null;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar
          fallback="T"
          src={user.images[0].url}
          alt={user.userName}
          size="4"
          radius="full"
          style={{ cursor: "pointer" }}
        />
      </Popover.Trigger>

      <Popover.Content sideOffset={8}>
        <Flex gap="4" justify="center" align="center">
          <Text>Toggle the theme:</Text>
          <ThemeToggle />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default NavBarPopover;
