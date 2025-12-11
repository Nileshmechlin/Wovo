import {IFechtStatus} from './Fechting';

export interface INotification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message: string;
    amount: string;
    sender_id: number;
    image: string;
  };
  read_at: null;
  created_at: string;
  updated_at: string;
}

export interface INotificationList extends IFechtStatus {
  data: Array<INotification>;
}
