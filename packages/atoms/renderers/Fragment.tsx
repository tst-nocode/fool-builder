import React, { Fragment, ReactNode } from "react";
import { CofeRendererProps } from "@fool-builder/types";

interface FragmentRendererProps extends CofeRendererProps {
  children?: ReactNode;
}

export const FragmentRenderer = ({ children }: FragmentRendererProps) => {
  return <Fragment>{children}</Fragment>;
};
