import { useMemo } from "react";
import Button from "../micro/button";
import { DELIVERY_CHARGE } from "../utils/constants";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Breadcrumbs } from "../micro/bread-crumbs";
import { useCartStore } from "../store";
import EmptyCart from "./empty-cart";
import { ProductType } from "../../lib/types";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router";
import { getCurrentToken, getCurrentUser } from "../../lib/api-client";
import { useClient } from "../../lib/hooks";
import {
  useGenerateTransactionReference,
  useVerifyTransaction,
} from "../../lib/hooks/transaction";
import ModalComponent from "../micro/modal";
import { IoBagCheckSharp } from "react-icons/io5";
import { RiCloseLargeLine, RiHourglass2Fill } from "react-icons/ri";

const Cart = () => {
  const navigate = useNavigate();
  const clientId = getCurrentUser();
  const { data: userDetails } = useClient(clientId);
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const { data: transaction } = useVerifyTransaction(reference);
  const { cart, removeFromCart, updateCart, clearCart } = useCartStore();
  const { mutate: generateTransactionReference, isPending } =
    useGenerateTransactionReference();

  const handleIncreaseQuantity = (product: ProductType) => {
    updateCart(product, product.quantity + 1);
  };

  const handleDecreaseQuantity = (product: ProductType) => {
    updateCart(product, product.quantity - 1);
  };

  const handleRemoveCart = (product: ProductType) => {
    removeFromCart(product);
    toast.success("Product removed from cart");
  };

  const subTotal = cart.reduce((acc, currentValue) => {
    return acc + Number(currentValue.price * currentValue.quantity);
  }, 0);

  const discount = cart.reduce((acc, currentValue) => {
    return acc + Number(currentValue.discount || 0);
  }, 0);

  const deliveryCharge = cart.length > 0 ? DELIVERY_CHARGE : 0;

  const total = useMemo(() => {
    return subTotal + deliveryCharge - discount;
  }, [subTotal, discount]);

  const handleCheckout = () => {
    if (!getCurrentToken()) {
      return navigate("/login");
    }
    const products = cart.map(({ _id, name, quantity, price }) => ({
      _id,
      name,
      quantity,
      price,
    }));
    const amount = total * 1500;
    generateTransactionReference(
      { email: userDetails?.user?.email, amount, products },
      {
        onSuccess: (data) => {
          window.location.href = data.data.authorization_url;
        },
      }
    );
  };

  const handleClose = () => {
    clearCart();
    navigate("/shop", { replace: true });
  };

  return (
    <section className="mx-auto container px-8 lg:px-16">
      <Breadcrumbs
        crumbs={[{ title: "Shop", link: "/shop" }, { title: "Cart" }]}
      />
      <h1 className="sm:text-3xl text-xl">Your cart</h1>

      <div className="mt-5 flex flex-col lg:flex-row lg:justify-between gap-5 w-full">
        <section className="w-full rounded-xl space-y-5 p-5 border border-black/10">
          {cart.length > 0 ? (
            <>
              {cart.map((product) => (
                <div key={product._id}>
                  <div
                    key={product._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-5"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[124px] max-h-[124px] w-full h-full"
                    />
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{product.name}</p>
                        <RiDeleteBin5Fill
                          className="text-[#FF3333] cursor-pointer"
                          onClick={() => handleRemoveCart(product)}
                        />
                      </div>
                      <p>Size: {product.size}</p>
                      <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center justify-between gap-2 bg-black/5 max-w-[150px] w-full p-2 px-5 rounded-full cursor-pointer">
                          <span onClick={() => handleDecreaseQuantity(product)}>
                            <FaMinus />
                          </span>
                          {product.quantity}
                          <span onClick={() => handleIncreaseQuantity(product)}>
                            <FaPlus />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-black/5 my-5"></div>
                </div>
              ))}
            </>
          ) : (
            <EmptyCart />
          )}
        </section>
        <section className="max-w-sm w-full h-fit rounded-xl p-5 border border-black/10">
          <p className="font-bold text-xl">Order Summary</p>
          <div className="space-y-3 mt-5">
            <div className="flex justify-between items-center">
              <p className="text-black/60">Subtotal</p>
              <p className="font-bold">${subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-black/60">Discount</p>
              <p className="font-bold text-[#FF3333]">{discount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-black/60">Delivery Fee</p>
              <p className="font-bold">${deliveryCharge}</p>
            </div>
            <div className="border border-black/5"></div>
            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-bold text-xl">${total}</p>
            </div>
            <Button
              className="mt-5 w-full"
              size="l"
              dark
              isLoading={!total || isPending}
              onClick={handleCheckout}
            >
              Go to Checkout
            </Button>
          </div>
        </section>
      </div>
      <ModalComponent
        title="Payment Status"
        open={!!transaction}
        handleClose={handleClose}
      >
        <div className="flex justify-center items-center">
          {transaction?.status === "success" && (
            <div className="flex flex-col justify-center space-y-2">
              <IoBagCheckSharp className="text-5xl text-green-700 w-full" />

              <p className="text-sm text-center">
                Your order was successfully processed. You can view your orders
                to track the delivery process. Thank you for shopping with us!
              </p>

              <div className="flex justify-center my-3">
                <Link to="/orders">
                  <Button>View orders</Button>
                </Link>
              </div>
            </div>
          )}

          {transaction?.status === "failed" && (
            <div className="flex flex-col justify-center space-y-2">
              <RiCloseLargeLine className="text-5xl text-red-700 w-full" />

              <p className="text-sm text-center">
                Your payment failed. Please try again or contact support if the
                issue persists.
              </p>

              <div className="flex justify-center my-3">
                <Link to="/orders">
                  <Button>View orders</Button>
                </Link>{" "}
              </div>
            </div>
          )}

          {transaction?.status === "pending" && (
            <div className="flex flex-col justify-center space-y-2">
              <RiHourglass2Fill className="text-5xl text-amber-400 w-full" />

              <p className="text-sm text-center">
                Your payment is currently being processed. Please wait a moment
                and refresh the page, or check your email for updates.
              </p>

              <div className="flex justify-center my-3">
                <Link to="/orders">
                  <Button>View orders</Button>
                </Link>{" "}
              </div>
            </div>
          )}
        </div>
      </ModalComponent>
    </section>
  );
};

export default Cart;
