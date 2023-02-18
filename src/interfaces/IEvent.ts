interface IEvent {
  id: number;
  name: string;
  itemCount: number;
  description?: string;
  owner_id?: number;
}

export default IEvent;
