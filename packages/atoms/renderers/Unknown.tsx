import React, { Fragment, ReactNode } from "react";
import { CofeRendererProps } from "@fool-builder/types";

interface UnknownRendererProps extends CofeRendererProps {
  children?: ReactNode;
}

export const UnknownRenderer = ({ children }: UnknownRendererProps) => {
  return <Fragment>{children}</Fragment>;
};
