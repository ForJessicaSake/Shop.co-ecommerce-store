import { ErrorBoundary } from "../error/index.js";
import Transaction from "../models/transaction.js";
import Product from "../models/product.js";

export const getOrders = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await Transaction.find({
      userId,
      status: "SUCCESSFUL",
    }).sort({ created: -1 });

    const products = orders.flatMap((order) =>
      (order.products || []).map((product) => ({
        ...(product.toObject ? product.toObject() : product),
        transactionDate: order.transactionDate,
        transactionId: order._id,
      }))
    );

    const productIds = [...new Set(products.map((product) => product._id))];

    // Fetch product details including images
    const productsWithDetails = await Product.find(
      { _id: { $in: productIds } },
      { name: 1, price: 1, image: 1 }
    ).lean();

    // Create a map for quick lookup
    const productMap = {};
    productsWithDetails.forEach((product) => {
      productMap[product._id.toString()] = product;
    });

    const AllProducts = products.map((product) => ({
      ...(product.toObject ? product.toObject() : product),
      image: productMap[product._id.toString()]?.image || null,
    }));

    res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: AllProducts,
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to fetch orders", 500));
  }
};
