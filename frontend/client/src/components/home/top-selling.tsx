import Product from "../micro/product";
import Button from "../micro/button";
import { useGetProducts } from "../../lib/hooks/product";
import { useNavigate } from "react-router";
import { Skeleton } from "@mui/material";

const TopSelling = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts({ topSelling: true });
  return (
    <section className="mx-auto container px-8 lg:px-16">
      <h2 className="text-xl sm:text-4xl font-bold text-center my-10">
        TOP SELLING
      </h2>
      <div>
        {isLoading ? (
          <div className="w-full">
            <div className="hidden pb-5 gap-5 lg:overflow-hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:place-items-center">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={250}
                  height={250}
                  className="animate-pulse rounded-xl"
                />
              ))}
            </div>
            <div className="md:hidden flex justify-center pb-5 gap-5 overflow-x-auto lg:overflow-hidden">
              {Array.from({ length: 1 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={250}
                  height={250}
                  className="animate-pulse rounded-xl"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex pb-5 gap-5 overflow-x-auto justify-center lg:overflow-hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:place-items-center">
            {products?.slice(4, 8).map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <Button onClick={() => navigate("/shop")}>View All</Button>
      </div>
    </section>
  );
};

export default TopSelling;
