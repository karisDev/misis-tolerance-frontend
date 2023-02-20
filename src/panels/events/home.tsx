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
  ScreenSpinner,
  Search,
} from "@vkontakte/vkui";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import { set } from "../../store";
import EventCard from "../../components/cards/EventCard";
import { PanelTypes } from "../../structure";

const EventsPanelHome = ({
  router,
  onScanQRClick,
}: {
  router: any;
  onScanQRClick?: () => void;
}) => {
  const mainStorage = useSelector((state: any) => state.main);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      const response = await fetch("https://vknft.seizure.icu/get/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + mainStorage.accountToken || "",
        },
      });
      const data = await response.json();

      if (data) {
        const eventObjects = data.map(
          (event: any) =>
            ({
              name: event.title,
              id: event.event_id,
              itemCount: event.tickets ? event.tickets.length : 0,
              imageSrc: event.image,
            } as IEvent)
        );
        setEvents(eventObjects);
      }
      setLoading(false);
    };
    getEvents();
  }, [mainStorage.accountToken]);

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
          {events
            // @ts-ignore
            .filter((event) =>
              event.name.toLowerCase().includes(search.toLowerCase())
            )
            // @ts-ignore
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onOpenEventById(event.id)}
              />
            ))}
          {events.length === 0 && <Div>Тут пусто</Div>}
        </Div>
      </Group>
      {loading && <ScreenSpinner />}
    </>
  );
};

export default withRouter(EventsPanelHome);
