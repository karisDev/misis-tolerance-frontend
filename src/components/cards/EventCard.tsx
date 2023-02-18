import { FC } from "react";
import IEvent from "../../interfaces/IEvent";

interface EventCardProps {
  event: IEvent;
  imgSrc?: string;
  onClick?: () => void;
}

const EventCard: FC<EventCardProps> = ({ event, imgSrc, onClick }) => {
  return (
    <div className="eventCard" onClick={onClick}>
      <img
        className="eventCard__img"
        src={imgSrc ? imgSrc : "https://picsum.photos/200/200"}
        alt="event"
      />
      <h4 className="eventCard__title">{event.name}</h4>
      <p className="eventCard__itemCount">{event.itemCount} предмета</p>
    </div>
  );
};

export default EventCard;
