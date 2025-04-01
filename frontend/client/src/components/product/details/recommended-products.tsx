import { Skeleton } from "@mui/material";
import { useGetProducts } from "../../../lib/hooks/product";
import Product from "../../micro/product";

const RecommendedProducts = () => {
  const { data: products, isLoading } = useGetProducts();
  return (
    <section id="new-arrivals">
      <h2 className="text-xl sm:text-4xl font-bold text-center my-10">
        You might also like
      </h2>
      <div className="w-full flex pb-5 gap-5 overflow-x-auto lg:grid lg:grid-cols-4 lg:place-content-center">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={250}
                height={250}
                className="animate-pulse rounded-xl"
              />
            ))
          : products
              ?.slice(7, 12)
              .map((product, index) => (
                <Product key={index} product={product} />
              ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
