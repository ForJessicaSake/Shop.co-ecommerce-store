import { Breadcrumbs } from "../../micro/bread-crumbs";
import AllReviews from "./all-reviews";
import Product from "./product";
import RecommendedProducts from "./recommended-products";

const ProductDetails = () => {
  return (
    <div className="container mx-auto px-8 lg:px-16">
      <Breadcrumbs
        crumbs={[
          { title: "Shop", link: "/shop" },
          { title: "Product details" },
        ]}
      />
      <Product />
      <AllReviews />
      <RecommendedProducts />
    </div>
  );
};

export default ProductDetails;
