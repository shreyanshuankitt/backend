const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },

    description: {
      type: String,
      trim: true,
      require: true,
      max: 2000,
    },

    price: {
      type: Number,
      require: true,
      max: 10,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },

    stock: {
      type: Number,
    },

    sold: {
      type: Number,
      default: 0,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
