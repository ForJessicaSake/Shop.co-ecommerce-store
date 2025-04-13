import { Link } from "react-router";
import { IoIosStar } from "react-icons/io";
import { ProductType } from "../../lib/types";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const { _id, image, name, price, rating, discount } = product;

  return (
    <div className="min-w-48 sm:w-72 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition-transform hover:scale-105">
      <Link to={`/product/details/${_id}`}>
        <img src={image} alt={name} className="w-full h-60 object-cover" />
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-800">{name}</p>

        <div className="flex items-center gap-1 text-sm text-yellow-500">
          {typeof rating === "number" &&
            rating > 0 &&
            Array.from({ length: rating }).map((_, index) => (
              <IoIosStar key={index} />
            ))}
          <span className="text-xs text-gray-500">
            {typeof rating === "number" && rating > 0 && `(${rating}/5)`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${price}</p>

          {discount && (
            <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {discount && (
          <p className="text-sm text-gray-500 line-through">
            ${price - (price * discount) / 100}
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
