import { Avatar, Popover } from "@radix-ui/themes";
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

      <Popover.Content sideOffset={8} onOpenAutoFocus={(e) => e.preventDefault()}>
        <ThemeToggle />
      </Popover.Content>
    </Popover.Root>
  );
};

export default NavBarPopover;
