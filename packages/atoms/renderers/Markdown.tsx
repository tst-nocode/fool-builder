import React, { useEffect, useState } from "react";
import { CofeRendererProps } from "@fool-builder/types";
import { Markdown, MarkdownProps } from "@fool-builder/ui";

interface MarkdownRendererProps extends CofeRendererProps, MarkdownProps {
  content?: string;
  colorScheme?: string;
}

let _toHTML;

const toHTML = async (content: string) => {
  if (!_toHTML) {
    _toHTML = await import("@fool-builder/md").then(({ createToHTML }) =>
      createToHTML()
    );
  }

  return _toHTML(content);
};

export const MarkdownRenderer = ({
  // dropping children
  children,
  content,
  ...props
}: MarkdownRendererProps) => {
  const [hProps, setHProps] = useState(null);

  useEffect(() => {
    toHTML(content).then((__html) => {
      setHProps({
        dangerouslySetInnerHTML: {
          __html,
        },
      });
    });
  }, [content]);

  return (
    <Markdown
      sx={{
        "& li": {
          marginInlineStart: "2em",
        },
      }}
      {...hProps}
      {...props}
    />
  );
};
