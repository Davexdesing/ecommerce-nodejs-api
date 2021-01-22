const { success, error } = require("../network/response");
const Order = require("../models/Order");
const Stripe = require("stripe");
const Product = require("../models/Product");
const { config } = require("../config");

const stripe = new Stripe(
  config.stripeSecret
);
const get = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let order = await Order.find({})
      .populate(["user", "product"])
      .skip(from)
      .limit(limited)
      .exec();
    let count = await Order.count();

    success(res, "", 200, {
      order: order,
      count: count,
    });
  } catch (err) {
    console.error("[error]", err);
    error(res, "", 500, err);
  }
};

const store = async (req, res) => {
  try {
    const user = req.user.user.id;
    const cart = req.cart;
    const stock = req.stock;

    const payment = await stripe.paymentIntents.create({
      amount: cart.totalCost * 100,
      payment_method: req.body.id,
      description: "Ozuna Store",
      confirm: true,
      currency: "USD",
    });

    const order = new Order({
      user: user,
      totalCost: cart.totalCost,
      cart: stock,
      paymentId: payment.id,
      address: req.body.address,
    });

    await order.save();

    success(res, "Has been saved successfully", 201, order);
  } catch (err) {
    console.error("[error]", err);
    error(res, "", 500, err);
  }
};

const delivered = async (req, res) => {
  try {
  } catch (err) {}
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    const order = await Order.findById({_id: id}).populate('user').populate({
        path: "cart.product",
        model: 'Stock',
        populate:[{
            path: 'product',
            model: 'Product'
        },
        {
            path: 'stockimages',
            model: 'StockImage'
        },
    ]
    }).exec();

    if (!order) {
      error(res, "Resource not found", 404, "");
      return;
    }

    success(res, "", 200, order);
  } catch (err) {
    console.log("[error]", err);
    error(res, "", 500, err);
  }
};

const userShow = async (req, res) => {
  try {
    let user_id = req.user.user.id;
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let order = await Order.find({ user: user_id })
      .populate(["user", "stock"])
      .skip(from)
      .limit(limited)
      .exec();

    if (!order) {
      error(res, "Resource not found", 404, "");
      return;
    }

    success(res, "", 200, order);
  } catch (err) {
    console.log("[error]", err);
    error(res, "", 500, err);
  }
};

module.exports = {
  get,
  store,
  show,
  userShow,
  delivered

};
