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
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import { set } from "../../store";
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
  {
    name: "Концерт “Кирилл”",
    itemCount: 24,
    id: 4,
  },
  {
    name: "Концерт “Олег”",
    itemCount: 24,
    id: 5,
  },
];

const EventsPanelHome = ({
  router,
  onScanQRClick,
}: {
  router: any;
  onScanQRClick?: () => void;
}) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget) {
      setSearch(e.currentTarget.value);
    }
  };

  const onOpenEventById = (id: number) => {
    dispatch(set({ aboutPanelEventId: id }));
    router.toPanel(PanelTypes.EVENTS_ABOUT);
  };

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={() => onScanQRClick && onScanQRClick()}>
            <Icon28QrCodeOutline />
          </PanelHeaderButton>
        }
      >
        Мероприятия
      </PanelHeader>
      <Group className="events">
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
        <Div className="events__container">
          {eventsExample
            .filter((event) =>
              event.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onOpenEventById(event.id)}
              />
            ))}
        </Div>
      </Group>
    </>
  );
};

export default withRouter(EventsPanelHome);
