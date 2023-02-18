import { FC } from "react";

interface EventCardProps {
  title: string;
  imgSrc?: string;
  itemCount: number;
}

const EventCard: FC<EventCardProps> = ({ title, imgSrc, itemCount }) => {
  return (
    <div className="eventCard">
      <img
        className="eventCard__img"
        src={imgSrc ? imgSrc : "https://picsum.photos/200/200"}
        alt="event"
      />
      <h4 className="eventCard__title">{title}</h4>
      <p className="eventCard__itemCount">{itemCount} предмета</p>
    </div>
  );
};

export default EventCard;
