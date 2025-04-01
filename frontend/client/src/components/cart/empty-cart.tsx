import emptyCart from "../../assets/images/cart.png";
const EmptyCart = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center h-full gap-2">
      <img src={emptyCart} alt="empty cart" />
      <p className="font-medium text-lg">Your cart is empty</p>
      <p className="max-w-sm text-sm">
        Looks like you haven&apos;t added anything to your cart yet. Go ahead &
        explore top categories.
      </p>
    </div>
  );
};

export default EmptyCart;
