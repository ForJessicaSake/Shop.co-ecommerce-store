import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductDetails,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductDetails);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/edit/:id", updateProduct);

export default router;
