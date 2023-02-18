import { FC } from "react";

interface ImageCardProps {
  name: string;
  body: string;
  imgSrc: string;
  onClick?: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ name, body, imgSrc, onClick }) => {
  return (
    <div className="imageCard" onClick={() => onClick && onClick()}>
      <img
        className="imageCard__img"
        src={imgSrc ? imgSrc : "https://picsum.photos/200/200"}
        alt="event"
      />
      <h4 className="imageCard__title">{name}</h4>
      <p className="imageCard__itemCount">{body}</p>
    </div>
  );
};

export default ImageCard;
