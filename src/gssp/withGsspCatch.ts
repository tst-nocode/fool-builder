import { GetServerSidePropsContext } from "next";
import { debug, warn } from "@fool-builder/logger";

export const withGsspCatch =
  () => (next: any) => async (context: GetServerSidePropsContext) => {
    debug("gssp")("withGsspCatch");

    if (next) {
      try {
        return await next(context);
      } catch (err: any) {
        warn("gssp")("[error] %j", err.message);
        debug("gssp")("[stack] %j", err.stack);

        return {
          props: {
            err,
          },
        };
      }
    } else {
      return {
        props: {},
      };
    }
  };
