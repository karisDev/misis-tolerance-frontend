import { Button } from "@vkontakte/vkui";
import { FC } from "react";

interface ImageCardProps {
  name: string;
  body: string;
  imgSrc: string;
  onClick?: () => void;
}

const GetTicketCard: FC<ImageCardProps> = ({ name, body, imgSrc, onClick }) => {
  return (
    <div className="imageCard getTicket" onClick={() => onClick && onClick()}>
      <img
        className="imageCard__img"
        src={imgSrc ? imgSrc : "https://picsum.photos/200/200"}
        alt="event"
      />
      <h4 className="imageCard__title">{name}</h4>
      <p className="imageCard__itemCount">{body}</p>
      <Button
        mode="secondary"
        className="imageCard__button"
        onClick={() => onClick && onClick()}
      >
        Получить
      </Button>
    </div>
  );
};

export default GetTicketCard;
