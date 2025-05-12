import { Button } from "@radix-ui/themes";
import { toggleTheme } from "../containers/theme/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../containers/theme/selectors";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { FC } from "react";

const ThemeToggle: FC = () => {
  const dispatch = useDispatch();
  const appearance = useSelector(selectTheme);

  return (
    <Button
      onClick={() => {
        dispatch(toggleTheme());
      }}
      variant="ghost"
      className="rounded-full"
      size="3"
      style={{ cursor: "pointer" }}
    >
      {appearance === "light" ? (
        <SunIcon width="20" height="20" />
      ) : (
        <MoonIcon width="20" height="20" />
      )}
    </Button>
  );
};

export default ThemeToggle;
