import { Icon20FilterOutline } from "@vkontakte/icons";
import {
  Button,
  Div,
  Group,
  IconButton,
  PanelHeader,
  PanelHeaderBack,
  ScreenSpinner,
  Search,
} from "@vkontakte/vkui";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import GetTicketCard from "../../components/cards/GetTicketCard";
import IEvent from "src/interfaces/IEvent";
import { PanelTypes, ViewTypes } from "../../structure";
import { set } from "../../store";

const EventsPanelAbout = ({ router }: { router: any }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [tickets, setTickets] = useState<any>([]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget) {
      setSearch(e.currentTarget.value);
    }
  };

  const mintNft = async (ticket: any) => {
    setLoading(true);
    const response = await fetch(
      `https://vknft.seizure.icu/mint_nft/?vk_id=${mainStorage.user.id}&nft_id=${ticket.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + mainStorage.accountToken || "",
        },
      }
    ).catch(() => {
      router.toModal("ticket_error");
    });
    if (!response) return;

    const data = await response.json();
    if (data.status == "ok") {
      router.toModal("ticket_accepted");
    } else {
      router.toModal("ticket_error");
    }
    setLoading(false);
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
        dateString: new Date(data.datetime).toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }),
        location: data.place,
        description: data.description,
        imgSrc: data.image,
        ownerId: data.owner_id,
      } as IEvent;
      setEvent(eventObject);
    };

    const getTickets = async () => {
      // /get/event/nfts
      const response = await fetch(
        `https://vknft.seizure.icu/get/event/nfts?event_id=${mainStorage.aboutPanelEventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + mainStorage.accountToken || "",
          },
        }
      );
      const data = await response.json();
      setTickets(data);
    };

    if (mainStorage.aboutPanelEventId) {
      getEvent();
      getTickets();
    } else {
      router.toPanel(PanelTypes.EVENTS_HOME);
    }
  }, [mainStorage.aboutPanelEventId, mainStorage.accountToken]);

  const onEditClick = (id: number) => {
    dispatch(set({ profilePanelEventId: id }));
    router.toModal("event_edit");
    // router.toView(ViewTypes.PROFILE);
    // router.toPanel(PanelTypes.PROFILE_EVENT_INFO);
  };

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
            <Button
              style={{ marginTop: 16 }}
              size="l"
              mode="secondary"
              onClick={() => onEditClick(event.id)}
            >
              Редактировать
            </Button>
          </Div>
          <Div className="eventAbout__search">
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
          <Div className="eventAbout__tickets">
            {tickets.map((ticket: any) => (
              <GetTicketCard
                key={ticket.id}
                name={ticket.title}
                body={ticket.description}
                imgSrc={
                  ticket.blurredImage
                    ? ticket.blurredImage
                    : "https://picsum.photos/200/200"
                }
                onClick={() => mintNft(ticket)}
              />
            ))}
          </Div>
        </Group>
      ) : (
        <ScreenSpinner />
      )}
      {loading && <ScreenSpinner />}
    </>
  );
};

export default withRouter(EventsPanelAbout);
