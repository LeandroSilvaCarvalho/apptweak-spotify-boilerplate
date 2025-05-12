import { Box, Flex } from "@radix-ui/themes";
import { FC } from "react";
import ThemeToggle from "./theme-toggle";
import logo from "../logo.svg";
import logoDark from "../logo-dark.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "../containers/theme/selectors";

const NavBar: FC = () => {
  const appearance = useSelector(selectTheme);
  return (
    <nav style={{ height: "70px" }}>
      <Flex align="center" justify="between" height="100%">
        <Box />
        <Flex align="center" gap="2">
          <Box>
            <img
              src={appearance === "dark" ? logoDark : logo}
              alt="Logo"
              style={{ height: "34px" }}
            />
          </Box>
        </Flex>

        <Flex align="center" gap="2">
          <ThemeToggle />
        </Flex>
      </Flex>
    </nav>
  );
};

export default NavBar;
