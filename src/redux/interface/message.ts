import {IFechtStatus} from './Fechting';

export interface IUserChat {
  id?: number;
  full_name?: string;
  user_name?: string;
  email?: string;
  location?: string;
  image?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
}

export interface IUserChats extends IFechtStatus {
  data: Array<IUserChat>;
}

export interface IMessage {
  id: number;
  message: string;
  images: [string];
  is_read: any;
  created_at: string;
  sender: {
    id: number;
    full_name: string;
    email: string;
    image: string;
  };
}

export interface IMessages extends IFechtStatus {
  data: Array<IMessage>;
}
