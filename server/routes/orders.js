const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

// PLACE NEW ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({
        message: "Order items and shipping address are required"
      });
    }

    let totalAmount = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: "Invalid product quantity"
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      totalAmount += product.price * quantity;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: verifiedItems,
      shippingAddress,
      totalAmount
    });
    console.log("NEW ORDER SAVED:",order_id);

    for (const item of verifiedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
  console.error("ORDER CREATION ERROR:", error);

  res.status(500).json({
    message: error.message || "Failed to place order"
  });
} 
});

// GET LOGGED-IN USER'S ORDERS
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
});

module.exports = router;