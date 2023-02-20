import { FC } from "react";
import IEvent from "../../interfaces/IEvent";

interface EventCardProps {
  event: IEvent;
  onClick?: () => void;
}

const EventCard: FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div className="eventCard" onClick={onClick}>
      <img
        className="eventCard__img"
        src={event.imgSrc ? event.imgSrc : "https://picsum.photos/200/200"}
        alt="event"
      />
      <h4 className="eventCard__title">{event.name}</h4>
      <p className="eventCard__itemCount">{event.itemCount} предметов</p>
    </div>
  );
};

export default EventCard;
