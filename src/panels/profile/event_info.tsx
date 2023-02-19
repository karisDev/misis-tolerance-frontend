import {
  Button,
  Div,
  Group,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import { PanelTypes } from "../../structure";

const ProfilePanelEventInfo = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    console.log(mainStorage.profilePanelEventId);
    if (mainStorage.profilePanelEventId) {
      console.log("true");
      const data = {
        id: 1,
        itemCount: 5,
        name: "Концерт ”Максим”",
        description:
          "В пятницу, 17 июня, певица МакSим дала первый после выхода из комы сольный популярный концерт.",
        dateString: "28 апреля · 18:00",
        location: "Олимпийский",
      } as IEvent;
      setTimeout(() => {
        setEvent(data);
      }, 100);
    }
  }, [mainStorage.profilePanelEventId]);

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={router.toBack} />}>
        {event && event.name}
      </PanelHeader>
      <Group className="homeEventInfo">
        {event ? (
          <>
            <Div className="homeEventInfo__header">
              <img
                className="homeEventInfo__img"
                src={
                  event && event.imgSrc
                    ? event.imgSrc
                    : "https://picsum.photos/200/200"
                }
                alt="event"
              />
              <h2 className="homeEventInfo__title">{event && event.name}</h2>
              <p className="homeEventInfo__info">
                {event && event.dateString}, “{event && event.name}“
              </p>
              <p className="homeEventInfo__description">
                {event && event.description}
              </p>
            </Div>
            <Div
              style={{ display: "flex", gap: "8px" }}
              className="homeEventInfo__controls"
            >
              <Button
                size="l"
                stretched
                mode="outline"
                onClick={() => {
                  console.log("click");
                }}
              >
                White List
              </Button>
              <Button
                size="l"
                stretched
                onClick={() => {
                  router.toPanel(PanelTypes.PROFILE_NEW_TICKET);
                }}
              >
                Новый билет
              </Button>
            </Div>
          </>
        ) : (
          <></>
        )}
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelEventInfo);
