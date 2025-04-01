import { adminAuth } from "../../../lib/hooks";
import Product from "./product";

const ProductDetails = () => {
  return (
    <div className="container my-10 ">
      <Product />
    </div>
  );
};

export default adminAuth(ProductDetails);
