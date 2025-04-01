export type ProductType = {
  _id?: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  description?: string;
  discount?: number;
  rating?: number;
  topSelling?: boolean;
};
