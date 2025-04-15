import { Link } from "react-router";
import { useGetAllProducts } from "../../lib/hooks/product";
import Skeleton from "@mui/material/Skeleton";
import Button from "../micro/button";
import { adminAuth } from "../../lib/hooks";
const Dashboard = () => {
  const { data, isLoading } = useGetAllProducts();
  return (
    <section className="overflow-hidden w-full">
      <div className="flex sm:flex-row flex-col gap-5 justify-between items-center my-10">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link to="/product/new">
          <Button className="mr-2" dark>
            Add Product
          </Button>
        </Link>
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
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
              <div
                key={product._id}
                className="min-w-48 sm:w-72 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition-transform hover:scale-105"
              >
                <Link to={`/product/details/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                  />
                </Link>

                <div className="p-4 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
                    {product.discount && (
                      <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default adminAuth(Dashboard);
