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
import { ChangeEvent, FC, useState } from "react";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import EventCard from "../../components/cards/EventCard";
import { PanelTypes } from "../../structure";

const eventsExample: IEvent[] = [
  {
    name: "Концерт “Максим”",
    itemCount: 24,
    id: 1,
  },
  {
    name: "Концерт “Кирилл”",
    itemCount: 24,
    id: 2,
  },
  {
    name: "Концерт “Олег”",
    itemCount: 24,
    id: 3,
  },
];

const EventsPanelHome = ({
  router,
  onOpenEventById,
}: {
  router: any;
  onOpenEventById?: (id: number) => void;
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
        className="helper_hideSpacing"
        before={
          <PanelHeaderButton>
            <Icon28QrCodeOutline />
          </PanelHeaderButton>
        }
      >
        Мероприятия
      </PanelHeader>
      <div className="events">
        <Search
          value={search}
          onChange={onSearchChange}
          after={
            <IconButton>
              <Icon20FilterOutline />
            </IconButton>
          }
        />
        {/* <Button onClick={() => router.toPanel(PanelTypes.EVENTS_ABOUT)}>
          Knopka
        </Button> */}
        <div className="events__container">
          {eventsExample
            .filter((event) =>
              event.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onOpenEventById && onOpenEventById(event.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default withRouter(EventsPanelHome);
