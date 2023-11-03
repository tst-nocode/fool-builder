import { GetServerSidePropsContext } from "next";
import { debug } from "@fool-builder/logger";

export const withGsspColorMode =
  () => (next: any) => async (context: GetServerSidePropsContext) => {
    debug("gssp")("withGsspColorMode");

    const colorModeKey =
      process.env.KEY_OF_COLOR_MODE_COOKIE || "chakra-ui-color-mode";
    const colorModeValue = context.req.cookies[colorModeKey] ?? "";
    const colorMode = `${colorModeKey}=${colorModeValue}`;

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

      return {
        ...rest,
        props: {
          ...props,
          colorMode,
        },
      };
    }

    return {
      props: {
        colorMode,
      },
    };
  };
