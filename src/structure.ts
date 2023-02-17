// structure.ts
import { IStructure } from "react-router-vkminiapps";

export enum ViewTypes {
  EVENTS = "EVENTS",
  SETTINGS = "SETTINGS",
  TICKETS = "TICKETS",
}

export enum PanelTypes {
  EVENTS_HOME = "EVENTS_HOME",
  EVENTS_ABOUT = "EVENTS_ABOUT",
  SETTINGS = "SETTINGS",
  TICKETS_HOME = "TICKETS",
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
