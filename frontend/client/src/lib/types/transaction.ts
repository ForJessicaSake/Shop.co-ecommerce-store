export type GenerateTransactionReferencePayloadProps = {
  amount: number;
  email: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
