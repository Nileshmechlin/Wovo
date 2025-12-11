import {IFechtStatus} from './Fechting';
import {IPagination} from './pagination';
import {IShop} from './shop';

export interface IProduct {
  id: number;
  full_name: string;
  user_name: string;
  status: string;
  image: string;
  product_name: string;
  category_name: string;
  product_code: string;
  price: number;
  description: string;
  product_images: Array<string>;
  shop: IShop;
}

export interface IProducts extends IFechtStatus {
  data: Array<IProduct>;
}

export interface ICategory {
  id: number;
  category_name: string;
}

export interface ICategories {
  data: IPagination<ICategory>;
}
