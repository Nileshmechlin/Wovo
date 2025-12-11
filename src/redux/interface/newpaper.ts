export interface INewpaper {
  newsfeed_id: number;
  id: number;
  user: {
    user_id: number;
    full_name: string;
    user_name: string;
    image: string;
  };
  content: string;
  image_count: number;
  images: Array<{url: string}>;
  newsfeed_status: string;
  like_count: number;
  auth_user_liked: boolean;
  privacy: string;
  comment_count: string;
}

export interface IComment {
  id: number;
  user_id: number;
  full_name: string;
  user_name: string;
  image: string;
  comment: string;
  created_at: string;
  reply_count: number;
  replies: Array<IComment>;
}

export interface INewpaperList {
  data: {
    newsfeeds: Array<INewpaper>;
  };
}
