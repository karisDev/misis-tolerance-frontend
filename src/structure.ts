// structure.ts
import { IStructure } from "react-router-vkminiapps";

export enum ViewTypes {
  EVENTS = "EVENTS",
  SETTINGS = "SETTINGS",
  PROFILE = "PROFILE",
  WALLET = "WALLET",
}

export enum PanelTypes {
  EVENTS_HOME = "EVENTS_HOME",
  EVENTS_ABOUT = "EVENTS_ABOUT",
  SETTINGS = "SETTINGS",
  PROFILE_HOME = "PROFILE_HOME",
  PROFILE_NEW_EVENT = "PROFILE_NEW_EVENT",
  PROFILE_NEW_TICKET = "PROFILE_NEW_TICKET",
  PROFILE_EVENT_INFO = "PROFILE_EVENT_INFO",
  PROFILE_EVENT_WHITELIST = "PROFILE_EVENT_WHITELIST",
  WALLET_HOME = "WALLET_HOME",
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
    hash: "profile",
    panels: [
      {
        id: PanelTypes.PROFILE_HOME,
        hash: "/home",
      },
      {
        id: PanelTypes.PROFILE_NEW_EVENT,
        hash: "/new_event",
      },
      {
        id: PanelTypes.PROFILE_NEW_TICKET,
        hash: "/new_event",
      },
      {
        id: PanelTypes.PROFILE_EVENT_INFO,
        hash: "/event_info",
      },
      {
        id: PanelTypes.PROFILE_EVENT_WHITELIST,
        hash: "/event_whitelist",
      },
    ],
  },
  {
    id: ViewTypes.WALLET,
    hash: "wallet",
    panels: [
      {
        id: PanelTypes.WALLET_HOME,
        hash: "/home",
      },
    ],
  },
];

export default structure;
