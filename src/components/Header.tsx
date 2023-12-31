import React from "react";
import { Box } from "@chakra-ui/react";
import { AppBar, Toolbar, ToolbarProps } from "@fool-builder/ui";

export const Header = ({
  children = <Box flex={1} />,
  ...props
}: ToolbarProps) => {
  return (
    <AppBar>
      <Toolbar gridGap={2} {...props}>
        {children}
      </Toolbar>
    </AppBar>
  );
};

if (process.env.NODE_ENV === "development") {
  Header.displayName = "Header";
}
