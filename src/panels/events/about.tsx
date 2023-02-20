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
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import GetTicketCard from "../../components/cards/GetTicketCard";
import IEvent from "src/interfaces/IEvent";
import { PanelTypes, ViewTypes } from "../../structure";
import { set } from "../../store";

const EventsPanelAbout = ({ router }: { router: any }) => {
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
    const response = await fetch(`https://vknft.seizure.icu/mint_nft/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + mainStorage.accountToken || "",
      },
      body: JSON.stringify({
        nft_id: Number(ticket.id),
        vk_id: Number(mainStorage.user.id),
      }),
    });
    const data = await response.json();
    console.log(data);
    console.log(
      JSON.stringify({
        nft_id: ticket.id,
        vk_id: mainStorage.user.id,
      })
    );
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
        imgSrc: data.image,
        ownerId: data.owner_id,
      } as IEvent;
      setEvent(eventObject);
      console.log(data);
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
      /*
      attended
: 
false
blurredImage
: 
""
description
: 
"test"
eventId
: 
1
id
: 
1
title
: 
"test"*/
      const data = await response.json();
      setTickets(data);
    };

    if (mainStorage.aboutPanelEventId) {
      getEvent();
      getTickets();
    }
  }, [mainStorage.aboutPanelEventId, mainStorage.accountToken]);

  const onEditClick = (id: number) => {
    dispatch(set({ profilePanelEventId: id }));
    setTimeout(() => {
      router.toPanel(PanelTypes.PROFILE_EVENT_INFO);
    }, 100);
    router.toView(ViewTypes.PROFILE);
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
    </>
  );
};

export default withRouter(EventsPanelAbout);
