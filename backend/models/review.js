import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    clientId: {
      type: String,
      required: [
        true,
        "Please enter your client id",
        { type: Schema.Types.ObjectId, ref: "Client" },
      ],
    },
    product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    review: {
      type: String,
      required: [true, "Please enter your review"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter your rating"],
    },
  },
  { timestamps: true }
);

const ProductReviews = mongoose.model("Review", reviewSchema);

export default ProductReviews;
