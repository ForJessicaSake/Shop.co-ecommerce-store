import Button from "../../micro/button";
import Spinner from "../../micro/spinner";
import {
  useGetProductDetails,
  useDeleteProduct,
} from "../../../lib/hooks/product";
import { useNavigate, useParams } from "react-router";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteProductMutation, isPending } = useDeleteProduct(id);
  const { data: product, isLoading } = useGetProductDetails(id);

  if (isLoading || !product) return <Spinner />;
  return (
    <section className="flex flex-col lg:flex-row gap-5 mt-10">
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
            <Button size="s" dark={product.size === "S"}>
              Small
            </Button>
            <Button size="s" dark={product.size === "M"}>
              Medium
            </Button>
            <Button size="s" dark={product.size === "L"}>
              Large
            </Button>
            <Button size="s" dark={product.size === "XL"}>
              X-Large
            </Button>
          </div>
        </div>
        <div className="border border-black/5"></div>
        <div className="flex flex-col sm:flex-row gap-5">
          <Button
            size="l"
            onClick={() => navigate(`/product/edit/${product._id}`)}
          >
            Edit Product
          </Button>
          <Button
            size="l"
            onClick={() => {
              alert("Are you sure you want to delete this product?");
              deleteProductMutation();
            }}
            isLoading={isPending}
            dark
          >
            Delete Product
          </Button>
        </div>
        <div className="border border-black/5"></div>
      </div>
    </section>
  );
};

export default Product;
