import { Icon28QrCodeOutline } from "@vkontakte/icons";
import {
  Button,
  Group,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import IEvent from "src/interfaces/IEvent";
import { PanelTypes } from "../../structure";

const EventsPanelAbout = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const [event, setEvent] = useState<IEvent | null>(null);
  useEffect(() => {
    if (mainStorage.aboutPanelEventId) {
      const data = {
        id: 1,
        itemCount: 5,
        name: "Концерт ”Максим”",
      } as IEvent;
      setTimeout(() => {
        setEvent(data);
      }, 1000);
    }
  }, [mainStorage.aboutPanelEventId]);

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={router.toBack} />}>
        О нас
      </PanelHeader>
      {event ? (
        <div className="eventAbout">{event.name}</div>
      ) : (
        <h1>Загрузка</h1>
      )}
    </>
  );
};

export default withRouter(EventsPanelAbout);
