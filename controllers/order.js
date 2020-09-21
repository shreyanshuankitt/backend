const { Order, ProductCart } = require("../models/order");
const { overSome } = require("lodash");
const order = require("../models/order");

exports.getOrderById = (res, req, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB ",
      });
      res.json(order);
    }
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No order found",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (res, req) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (res, req) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update status",
        });
      }
      res.json(order);
    }
  );
};
