import {IFechtStatus} from './Fechting';

export interface ITermsConditions extends IFechtStatus {
  data: {
    id: number;
    content: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
}

export interface IFaq extends IFechtStatus {
  id: number;
  question: string;
  answer: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface IFaqs extends IFechtStatus {
  data: Array<IFaq>;
}
