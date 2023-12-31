import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { CofeIcon } from "@fool-builder/icons";

export const HomeEntry = () => {
  return (
    <NextLink aria-label="返回首页" href="/" passHref>
      <Link colorScheme="gray">
        <CofeIcon boxSize="6" />
      </Link>
    </NextLink>
  );
};

if (process.env.NODE_ENV === "development") {
  HomeEntry.displayName = "HomeEntry";
}
