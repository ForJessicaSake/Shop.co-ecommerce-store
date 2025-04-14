import { useGetOrders } from "../../lib/hooks/order";
import { ProductType } from "../../lib/types";
import { Breadcrumbs } from "../micro/bread-crumbs";
import Spinner from "../micro/spinner";
import dayjs from "dayjs";
import emptyCart from "../../assets/images/cart.png";
import { Link } from "react-router";

const Orders = () => {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) return <Spinner />;
  return (
    <div className="mx-auto container px-8 lg:px-16">
      <Breadcrumbs
        crumbs={[{ title: "Shop", link: "/shop" }, { title: "Orders" }]}
      />
      <h1 className="sm:text-3xl text-xl my-5">Your orders</h1>

      <div className="mt-5 flex flex-col lg:flex-row lg:justify-between gap-5 w-full">
        <section className="w-full rounded-xl space-y-5 p-5 border border-black/10">
          {orders?.length > 0 ? (
            <>
              {orders?.map((order: ProductType) => (
                <div key={order._id}>
                  <div
                    key={order._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-5"
                  >
                    <div className="w-full space-y-2">
                      <p className="font-semibold sm:text-lg text-sm">
                        Order#: {order._id}
                      </p>
                      <p className="text-sm">
                        {order?.transactionDate &&
                          dayjs(order?.transactionDate).format(
                            "MMM DD, YYYY, hh:mm A"
                          )}
                      </p>
                      <p className="text-green-700 text-xs">
                        Estimated delivery timeframe is one month
                      </p>
                      <p className="text-xs font-semibold">
                        Qty: {order.quantity}
                      </p>
                    </div>
                    <img
                      src={order.image}
                      alt={order.name}
                      className="max-w-[124px] max-h-[124px] w-full h-full"
                    />
                  </div>
                  <div className="border border-black/5 my-5"></div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col text-center items-center justify-center h-full gap-2">
              <img src={emptyCart} alt="empty cart" />
              <p className="font-medium text-lg">Your have no order</p>
              <p className="max-w-sm text-sm">
                Looks like you haven&apos;t added made any purchase yet. Go
                ahead &{" "}
                <span className="underline">
                  <Link to="/shop">explore top categories.</Link>
                </span>
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Orders;
