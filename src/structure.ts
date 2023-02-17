// structure.ts
import { IStructure } from "react-router-vkminiapps";

export enum ViewTypes {
  MAIN = "MAIN",
  SETTINGS = "SETTINGS",
  TICKETS = "TICKETS",
}

export enum PanelTypes {
  MAIN_HOME = "MAIN_HOME",
  MAIN_ABOUT = "MAIN_ABOUT",
  SETTINGS = "SETTINGS",
  TICKETS_HOME = "TICKETS",
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
        id: PanelTypes.MAIN_ABOUT,
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
  {
    id: ViewTypes.TICKETS,
    hash: "tickets",
    panels: [
      {
        id: PanelTypes.TICKETS_HOME,
        hash: "/home",
      },
    ],
  },
];

export default structure;
