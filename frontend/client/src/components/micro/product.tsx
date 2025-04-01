import { Link } from "react-router";
import { IoIosStar } from "react-icons/io";
import { ProductType } from "../../lib/types";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const { _id, image, name, price, rating, discount } = product;

  return (
    <div className="min-w-48 sm:max-w-72 flex-none">
      <Link to={`/product/details/${_id}`}>
        <img
          src={image}
          alt={name}
          className="sm:w-[295px] hover:transition-all duration-500 ease-out hover:scale-105 overflow-hidden"
        />
      </Link>
      <div className="mt-2 space-y-1">
        <p className="font-bold">{name}</p>
        <div className="flex items-center gap-1 text-lg">
          {typeof rating === "number" &&
            rating > 0 &&
            Array.from({ length: rating }).map((_, index) => (
              <IoIosStar key={index} className="text-[#FFC633]" />
            ))}
          <p className="text-xs">
            {typeof rating === "number" && rating > 0 && `(${rating}/5)`}
          </p>
        </div>
        <p className="font-bold text-lg flex gap-3">
          ${price}
          {discount && (
            <span className="line-through text-black/60">
              ${discount && price - discount}
            </span>
          )}
          {discount && (
            <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs flex justify-center items-center p-2 rounded-full w-14 h-7">
              -{discount}%
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Product;
