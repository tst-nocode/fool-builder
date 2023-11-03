import { useCallback } from "react";
import { CofeApp } from "@fool-builder/types";
import { omit } from "lodash-es";
import { atom, useRecoilState } from "recoil";

export const appState = atom<CofeApp>({
  key: "app",
});

export const useAppState = () => {
  const [app, setApp] = useRecoilState(appState);

  return {
    ...app,
    updateApp: useCallback(
      (payload: any) => {
        setApp((state) => ({ ...state, ...payload }));
      },
      [setApp]
    ),
    createPage: useCallback(
      (payload: any) => {
        setApp((state) => ({
          ...state,
          pages: { ...state.pages, [payload.id]: payload },
        }));
      },
      [setApp]
    ),
    updatePage: useCallback(
      (payload: any) => {
        setApp((state: any) => ({
          ...state,
          pages: {
            ...state.pages,
            [payload.id]: {
              ...state.pages[payload.id],
              ...payload,
            },
          },
        }));
      },
      [setApp]
    ),
    removePage: useCallback(
      (payload: any) => {
        setApp((state) => ({
          ...state,
          pages: omit(state.pages, payload.id ?? payload),
        }));
      },
      [setApp]
    ),
  };
};
