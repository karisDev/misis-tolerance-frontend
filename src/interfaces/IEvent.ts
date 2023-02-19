interface IEvent {
  id: number;
  name: string;
  itemCount: number;
  description?: string;
  ownerId?: number;
  imgSrc?: string;
  dateString?: string;
  location?: string;
}

export default IEvent;
