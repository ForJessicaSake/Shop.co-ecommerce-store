export type ProductType = {
  _id: string;
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
