import mongoose from "mongoose";
import Product from "../models/product.js";
import { ErrorBoundary } from "../error/index.js";

export const getProducts = async (req, res, next) => {
  try {
    const { topSelling, style, size, minPrice, maxPrice } = req.query;

    let filter = {};
    if (topSelling) filter.topSelling = topSelling === "true";
    if (style) filter.style = style;
    if (size) filter.size = size;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to fetch products", 500));
  }
};

export const getProductDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to fetch product", 500));
  }
};

export const createProduct = async (req, res, next) => {
  const payload = req.body;
  try {
    const product = await Product.insertMany(payload);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product creation failed: No products were created.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(new ErrorBoundary("Product creation failed", 500));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new ErrorBoundary("Invalid product id", 400));
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product deletion.",
      });
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to delete product", 500));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new ErrorBoundary("Invalid product id", 400));
    }
    const product = await Product.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product update failed.",
      });
    }
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to update product", 500));
  }
};
