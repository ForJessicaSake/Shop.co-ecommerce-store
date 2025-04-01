import { Link } from "react-router";
import { useGetAllProducts } from "../../lib/hooks/product";
import Skeleton from "@mui/material/Skeleton";
import Button from "../micro/button";
import { adminAuth } from "../../lib/hooks";
const Dashboard = () => {
  const { data, isLoading } = useGetAllProducts();
  return (
    <section className="overflow-hidden">
      <div className="flex sm:flex-row flex-col gap-5 justify-between items-center my-10">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link to="/product/new">
          <Button className="mr-2" dark>
            Add Product
          </Button>
        </Link>
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={250}
                height={250}
                className="animate-pulse rounded-xl "
              />
            ))
          : data?.map((product) => (
              <div className="min-w-48 sm:max-w-72 flex-none" key={product._id}>
                <Link to={`/product/details/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="sm:w-[295px] hover:transition-all duration-500 ease-out hover:scale-105 overflow-hidden"
                  />
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
};

export default adminAuth(Dashboard);
