import { ObjectFieldTemplate } from "@fool-builder/form/templates/ObjectFieldTemplate";
import { UpDownWidget } from "@fool-builder/form/widgets/UpDownWidget";
import { CofeAtom } from "@fool-builder/types";
import { withDefaultProps } from "./helpers/withDefaultProps";
import { GridRenderer } from "./renderers/Grid";

export const grid: CofeAtom = {
  type: "grid",
  accept: ["!fragment"],
  properties: {
    type: "object",
    properties: {
      rows: {
        type: "number",
        title: "行数",
        default: 1,
        minimum: 1,
      },
      columns: {
        type: "number",
        title: "列数",
        default: 1,
        minimum: 1,
      },
      placeItems: {
        type: "string",
        title: "定位",
        enum: [
          "center",
          "flex-end",
          "flex-start",
          "self-end",
          "self-start",
          "baseline",
          "normal",
          "stretch",
        ],
        default: "center",
      },
    },
  },
  form: {
    "ui:ObjectFieldTemplate": withDefaultProps({
      gridGap: 2,
      templateColumns: "1fr 1fr",
      spanMap: {
        rows: 1,
        columns: 1,
        placeItems: 2,
      },
    })(ObjectFieldTemplate),
    rows: {
      "ui:widget": UpDownWidget,
    },
    columns: {
      "ui:widget": UpDownWidget,
    },
  },
  icon: "M 3.9921875,6 C 3.4426967,6 3,6.4374357 3,6.9804688 V 17.019531 C 3,17.562564 3.4426967,18 3.9921875,18 H 20.007812 C 20.557303,18 21,17.562564 21,17.019531 V 6.9804688 C 21,6.4374357 20.557303,6 20.007812,6 Z M 4.5,7 h 7 v 2 h 1 V 7 h 7 C 19.777,7 20,7.223 20,7.5 v 4 h -2 v 1 h 2 v 4 c 0,0.277 -0.233658,0.576098 -0.5,0.5 h -7 v -2 h -1 v 2 h -7 C 4.223,17 4,16.777 4,16.5 v -4 h 2 v -1 H 4 v -4 C 4,7.223 4.223,7 4.5,7 Z m 7,3 v 1.5 h -2 v 1 h 2 V 14 h 1 v -1.5 h 2 v -1 h -2 V 10 Z M 7,11.5 v 1 h 1.5 v -1 z m 8.5,0 v 1 H 17 v -1 z",
  renderer: GridRenderer,
};
