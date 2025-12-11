import {IFechtStatus} from './Fechting';

export interface IShop extends IFechtStatus {
  data: {
    id: number;
    user_id: number;
    shop_name: string;
    logo: string | null;
    status: 1;
    created_at: string;
    updated_at: string;
  };
}
