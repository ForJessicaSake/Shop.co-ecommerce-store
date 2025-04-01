import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    image: {
      type: String,
      required: [true, "Please enter product image"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: 0,
    },
    size: {
      type: String,
      required: [true, "Please enter product size"],
      enum: ["XS", "S", "M", "L", "XL"],
    },
    rating: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    topSelling: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
