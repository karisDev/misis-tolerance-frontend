import {
  Icon20FilterOutline,
  Icon24Filter,
  Icon28QrCodeOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import {
  Button,
  Div,
  Group,
  IconButton,
  PanelHeader,
  PanelHeaderButton,
  Search,
} from "@vkontakte/vkui";
import { ChangeEvent, useState } from "react";
import { withRouter } from "react-router-vkminiapps";
import EventCard from "../../components/cards/EventCard";
import { PanelTypes } from "../../structure";

const EventsPanelHome = ({
  router,
  OnScanQRClick: OnScanQR,
}: {
  router: any;
  OnScanQRClick: () => void;
}) => {
  const [search, setSearch] = useState("");

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget) {
      setSearch(e.currentTarget.value);
    }
  };
  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={OnScanQR}>
            <Icon28QrCodeOutline />
          </PanelHeaderButton>
        }
      >
        Мероприятия
      </PanelHeader>
      <Div>
        <div style={{ display: "flex" }}>
          <Search
            value={search}
            onChange={onSearchChange}
            after={
              <IconButton>
                <Icon20FilterOutline />
              </IconButton>
            }
          />
        </div>
        {/* <Button onClick={() => router.toPanel(PanelTypes.EVENTS_ABOUT)}>
          Knopka
        </Button> */}
        <div className="events">
          <EventCard title="Мероприятие 1" itemCount={24} />
          <EventCard title="Мероприятие 1" itemCount={24} />
          <EventCard title="Мероприятие 1" itemCount={24} />
          <EventCard title="Мероприятие 1" itemCount={24} />
          <EventCard title="Мероприятие 1" itemCount={24} />
        </div>
      </Div>
    </>
  );
};

export default withRouter(EventsPanelHome);
