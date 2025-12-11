import {IFechtStatus} from './Fechting';

interface IPayment {
  status: number;
  message: string;
}

export interface ITransactions {
  id: number;
  amount: string;
  total_love: string;
  payment_method: string;
  user: {
    id: number;
    full_name: string;
    user_name: string;
    email: string;
    image: string;
  };
  status: 'Send' | 'Buy' | 'Purchase' | 'Received';

  created_at: string;
}

export default interface IPaymentTransactions extends IFechtStatus {
  data: {
    user_balance: string;
    transactions: Array<ITransactions>;
    pagination: {
      total: number;
      current_page: number;
      last_page: number;
      per_page: number;
    };
  };
}
