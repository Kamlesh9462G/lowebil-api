const express = require("express");
const verifyToken = require("../middlewares/auth");
const productController = require("../controllers/product.controllers");
const { profileImage } = require("../middlewares/upload");
const router = express.Router();

router.route("/api/v1/products").post(
  profileImage.single("file"),
  verifyToken,
  productController.createProducts
);

module.exports = router;
