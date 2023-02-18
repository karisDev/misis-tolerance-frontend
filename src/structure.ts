// structure.ts
import { IStructure } from "react-router-vkminiapps";

export enum ViewTypes {
  EVENTS = "EVENTS",
  SETTINGS = "SETTINGS",
  PROFILE = "PROFILE",
}

export enum PanelTypes {
  EVENTS_HOME = "EVENTS_HOME",
  EVENTS_ABOUT = "EVENTS_ABOUT",
  SETTINGS = "SETTINGS",
  PROFILE_HOME = "PROFILE_HOME",
}

const structure: IStructure = [
  {
    id: ViewTypes.EVENTS,
    hash: "events",
    panels: [
      {
        id: PanelTypes.EVENTS_HOME,
        hash: "/home",
      },
      {
        id: PanelTypes.EVENTS_ABOUT,
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
    id: ViewTypes.PROFILE,
    hash: "tickets",
    panels: [
      {
        id: PanelTypes.PROFILE_HOME,
        hash: "/home",
      },
    ],
  },
];

export default structure;
