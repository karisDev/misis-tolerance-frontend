// structure.ts
import { IStructure } from "react-router-vkminiapps";

export enum ViewTypes {
  MAIN = "MAIN",
  SETTINGS = "SETTINGS",
}

export enum PanelTypes {
  MAIN_HOME = "MAIN_HOME",
  MAIN_ABOUT = "MAIN_ABOUT",
  SETTINGS = "SETTINGS",
}

const structure: IStructure = [
  {
    id: ViewTypes.MAIN,
    hash: "main",
    panels: [
      {
        id: PanelTypes.MAIN_HOME,
        hash: "/home",
      },
      {
        id: "about",
        hash: "/about",
      },
    ],
  },
  {
    id: ViewTypes.SETTINGS,
    hash: "settings",
    panels: [
      {
        id: PanelTypes.SETTINGS,
        hash: "",
      },
    ],
  },
];

export default structure;
