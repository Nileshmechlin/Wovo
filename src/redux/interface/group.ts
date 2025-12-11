import {IFechtStatus} from './Fechting';

export interface IGroup {
  group_id: number;
  group_name: string;
  group_members: number;
  group_image: string;
  created_date: string;
  group_creator: {
    id: number;
    full_name: string;
    user_name: string;
    email: string;
    image: string;
  };
  message_count: number;
  last_message: string;
  unread_message_count: number;
}

export interface IGroupList extends IFechtStatus {
  data: IGroup[];
}

export interface IGroupMessage {
  id: number;
  sender_id: number;
  sender: {
    full_name: string;
    image: string;
  };
  message: string;
  images: [string];
  is_read: string;
  is_read_by_user: false;
  read_by: [string];
  created_at: string;
}

export interface IGroupMessageList extends IFechtStatus {
  data: IGroupMessage[];
}

export interface IGroupMembers {
  success: boolean;
  member_count: number;
  data: [
    {
      id: number;
      full_name: string;
      user_name: string;
      email: string;
      image: string;
    },
  ];
}
