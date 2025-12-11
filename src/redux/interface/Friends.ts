import {IFechtStatus} from './Fechting';
import {IPagination} from './pagination';

export interface IFriend {
  id: number;
  user_id: number;
  user_name: string;
  full_name: string;
  is_accepted: number;
  image: string;
}

export interface IFriends {
  total_friends: number;
  friends: IPagination<IFriend>;
}
export interface IFriendsRequests {
  total_requests: number;
  friend_requests: IPagination<IFriend>;
}
export interface ISendRequests extends IFechtStatus {
  data: Array<IFriend>;
}
