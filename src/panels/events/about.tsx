import { Icon20FilterOutline, Icon28QrCodeOutline } from "@vkontakte/icons";
import {
  Button,
  Div,
  Group,
  IconButton,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  ScreenSpinner,
  Search,
} from "@vkontakte/vkui";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import { PanelTypes } from "../../structure";

const EventsPanelAbout = ({ router }: { router: any }) => {
  const [search, setSearch] = useState("");
  const mainStorage = useSelector((state: any) => state.main);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [tickets, setTickets] = useState([]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget) {
      setSearch(e.currentTarget.value);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      const response = await fetch(
        `https://vknft.seizure.icu/get/event?event_id=${mainStorage.aboutPanelEventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + mainStorage.accountToken || "",
          },
        }
      );
      const data = await response.json();
      const eventObject = {
        name: data.title,
        id: data.event_id,
        dateString: data.datetime,
        location: data.place,
        description: data.description,
        imgSrc: data.imgSrc,
      } as IEvent;
      setEvent(eventObject);
    };

    if (mainStorage.aboutPanelEventId) {
      getEvent();
    }
  }, [mainStorage.aboutPanelEventId, mainStorage.accountToken]);

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={router.toBack} />}>
        {event && event.name}
      </PanelHeader>
      {event ? (
        <Group className="eventAbout">
          <Div className="eventAbout__header">
            <img
              className="eventAbout__img"
              src={
                event.imgSrc ? event.imgSrc : "https://picsum.photos/200/200"
              }
              alt="event"
            />
            <h2 className="eventAbout__title">{event.name}</h2>
            {/* h3 default size in pixels:  */}
            <p className="eventAbout__info">
              {event.dateString}, “{event.location}“
            </p>
            <p className="eventAbout__description">{event.description}</p>
          </Div>
          <Div>
            <Search
              value={search}
              onChange={onSearchChange}
              after={
                <IconButton>
                  <Icon20FilterOutline />
                </IconButton>
              }
            />
          </Div>
        </Group>
      ) : (
        <ScreenSpinner />
      )}
    </>
  );
};

export default withRouter(EventsPanelAbout);
