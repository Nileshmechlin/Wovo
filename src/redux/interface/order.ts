import {IFechtStatus} from './Fechting';

export interface IOrder {
  order_id: number;
  total_amount: number;
  status: string;
  created_at: number;
  user: {
    id: number;
    full_name: string;
    user_name: string;
    image: string;
  };
  phone_number: string;
  address: {
    country: string;
    state: string;
    zipcode: string;
    full_address: string;
  };
  product: {
    product_id: string;
    product_name: string;
    price: string;
    description: string;
    images: [string];
  };
  notes: string;
}

export interface IOrders extends IFechtStatus {
  data: Array<IOrder>;
}
