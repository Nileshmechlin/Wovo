import {IFechtStatus} from './Fechting';

export interface ITransfer {
  id: number;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_by: {
    request_id: number;
    full_name: string;
    user_name: string;
    email: string;
    image: string;
  };
  created_at: string;
}

export interface IMyRequest extends IFechtStatus {
  data: Array<ITransfer>;
}
