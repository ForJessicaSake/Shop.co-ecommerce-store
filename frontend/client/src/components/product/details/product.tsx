import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Button from "../../micro/button";
import Spinner from "../../micro/spinner";
import { useGetProductDetails } from "../../../lib/hooks/product";
import { useParams } from "react-router";
import { useCartStore } from "../../store";
import { toast } from "sonner";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetails(id);
  const [count, setCount] = useState(1);
  const { addToCart, cart } = useCartStore();
  const handleIncreaseCount = () => setCount((prev) => prev + 1);
  const handleDecreaseCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const handleAddToCart = (product: any) => {
    if (count === 0) return toast.error("You must select a quantity");
    else if (cart.some((item) => product._id === item._id)) {
      toast.info("This product is already in your cart");
    } else {
      addToCart({ ...product, quantity: count });
      toast.success("Product successfully added to cart!");
    }
  };

  const [availableSize, setAvailableSize] = useState("");
  useEffect(() => {
    if (product) {
      setAvailableSize(product?.size);
    }
  }, [product]);

  if (isLoading || !product) return <Spinner />;
  return (
    <section className="flex flex-col lg:flex-row gap-5">
      <div className="max-w-md max-h-lg w-full h-full">
        <img src={product.image} alt="details" />
      </div>
      <div className="space-y-4">
        <h3 className="sm:text-3xl text-lg font-bold">{product.name}</h3>
        <p className="font-bold flex gap-3 md:text-xl text-base">
          ${product.price - (product.discount || 0)}
          {product.discount && (
            <>
              <span className="line-through text-black/60">
                ${product.price}
              </span>
              <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs flex justify-center items-center p-2 rounded-full w-14 h-7">
                -{product.discount}%
              </span>
            </>
          )}
        </p>
        <p className="max-w-lg">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>

        <div className="border border-black/5"></div>
        <div className="py-1">
          <p>Available size</p>
          <div className="mt-2 flex flex-col sm:flex-row lg:items-center gap-5 space-x-5">
            <Button size="s" dark={availableSize === "S"}>
              Small
            </Button>
            <Button size="s" dark={availableSize === "M"}>
              Medium
            </Button>
            <Button size="s" dark={availableSize === "L"}>
              Large
            </Button>
            <Button size="s" dark={availableSize === "XL"}>
              X-Large
            </Button>
          </div>
        </div>
        <div className="border border-black/5"></div>
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center my-7">
          <div className="flex items-center justify-between gap-5 bg-black/5 max-w-[150px] w-full p-2 px-5 rounded-full cursor-pointer">
            <span onClick={handleDecreaseCount}>
              <FaMinus />
            </span>
            {count}
            <span onClick={handleIncreaseCount}>
              <FaPlus />
            </span>
          </div>
          <Button size="l" dark onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Product;
