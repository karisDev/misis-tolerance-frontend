interface IEvent {
  id: number;
  name: string;
  itemCount: number;
  description?: string;
  owner_id?: number;
  imgSrc?: string;
  dateString?: string;
  place?: string;
}

export default IEvent;
