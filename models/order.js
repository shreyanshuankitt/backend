const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCart = new mongoose.Schema({
  product: {
    type: { ObjectId },
    ref: "Product",
  },

  name: String,
  count: Number,
  price: Number,
});

const productCart = mongoose.model("Product", ProductCart);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCart],
    transation_id: {},
    amount: {
      type: String,
    },
    address: String,
    status: {
      type: String,
      default: "",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, productCart };
