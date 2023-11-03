import { useCallback } from "react";
import { CofeDndAdjacent, CofeDndIdentity } from "@fool-builder/types";
import { isEqual } from "lodash-es";
import { atom, useRecoilState } from "recoil";

export interface DndState {
  dragging?: CofeDndIdentity | null;
  selected?: CofeDndIdentity | null;
  reference?: CofeDndIdentity | null;
  container?: CofeDndIdentity | null;
  adjacent?: CofeDndAdjacent | null;
}

export const dndState = atom<DndState>({
  key: "dnd",
});

export const useDndState = () => {
  const [dnd, setDnd] = useRecoilState(dndState);

  return {
    ...dnd,
    reset: useCallback(
      () =>
        setDnd({
          dragging: null,
          reference: null,
          container: null,
          adjacent: null,
        }),
      [setDnd]
    ),
    drag: useCallback(
      (payload: any) => {
        setDnd((state) =>
          isEqual(state.dragging, payload)
            ? state
            : {
                ...state,
                dragging: payload,
                selected: payload,
              }
        );
      },
      [setDnd]
    ),
    select: useCallback(
      (payload: any) => {
        setDnd((state) =>
          state.selected?.id === payload?.id
            ? state
            : {
                ...state,
                selected: payload,
              }
        );
      },
      [setDnd]
    ),
    setReference: useCallback(
      (payload: any) => {
        setDnd((state) =>
          isEqual(state.reference, payload)
            ? state
            : {
                ...state,
                reference: payload,
              }
        );
      },
      [setDnd]
    ),
    setContainer: useCallback(
      (payload: any) => {
        setDnd((state) =>
          isEqual(state.container, payload)
            ? state
            : {
                ...state,
                container: payload,
              }
        );
      },
      [setDnd]
    ),
    setAdjacent: useCallback(
      (payload: any) => {
        setDnd((state) =>
          state.adjacent === payload
            ? state
            : {
                ...state,
                adjacent: payload,
              }
        );
      },
      [setDnd]
    ),
  };
};
