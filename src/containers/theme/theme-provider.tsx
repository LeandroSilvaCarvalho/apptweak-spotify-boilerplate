import { Theme } from "@radix-ui/themes";
import { FC } from "react";
import { selectTheme } from "./selectors";
import { useSelector } from "react-redux";

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const appearance = useSelector(selectTheme);

  return (
    <Theme radius="large" accentColor="red" appearance={appearance}>
      {children}
    </Theme>
  );
};

export default ThemeProvider;
