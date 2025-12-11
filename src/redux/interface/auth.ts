import {IFechtStatus} from './Fechting';
import {INewpaper} from './newpaper';

export interface ILogin {
  status: number;
  message: string;
  token: string;
}

export interface IUser extends IFechtStatus {
  data: {
    id: number;
    full_name: string;
    user_name: string;
    privacy: string;
    email: string;
    image: string;
    friends_count: number;
    news_feeds: [];
    formattedProducts: [];
    created_at: Date;
    updated_at: Date;
  };
}

export interface IUserProfile extends IFechtStatus {
  data: {
    id: 3;
    full_name: string;
    user_name: string;
    bio: string;
    privacy: string;
    email: string;
    image: string;
    contact: string;
    friends_count: 2;
    news_feeds: Array<INewpaper>;
    shop: {
      shop_name: string;
    };
    formattedProducts: [];
    created_at: string;
    updated_at: string;
  };
}

export interface IProfile {
  status: true;
  message: string;
  data: {
    id: number;
    full_name: string;
    user_name: string;
    email: string;
    bio: string;
    privacy: 'public' | 'private' | 'friends';
    location: string;
    contact: string;
    balance: string;
    image: string;
    shop: {
      shop_name: string;
      logo: string;
      seller: {
        seller_name: string;
        user_name: string;
        email: string;
        image: string;
      };
    };
  };
}

export interface ValidToken {
  message: string;
  status: 200;
  token_status: boolean;
}

export interface IUsername {
  status: number;
  message: string;
  data: [
    {
      user_id: number;
      user_name: string;
    },
  ];
}
