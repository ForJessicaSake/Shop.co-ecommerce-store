import { ProductType } from "./product";

export type Transaction = {
  _id: string;
  reference: string;
  email: string;
  amount: number;
  fees: number;
  products: ProductType[];
  status: string;
  transactionDate: string;
  paymentChannel: string;
};
