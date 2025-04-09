export type PaystackProps = {
  reference: string;
  email: string;
  amount: number;
  publicKey: any;
};

export type PaymentResponse = {
  message: string;
  redirecturl: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
};
