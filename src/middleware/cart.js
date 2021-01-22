const Product = require("../models/Product");
const { success } = require("../network/response");

const cart = (req, res, next) => {
  const cart = req.body.cart;

  const change = cart.reduce((acc, currProduct) => {
    // Psuedocode:
    // Use the reduce method to iterate over the shoppingCart.
    // Convert each price to a floating point number.
    // Multiple the products price by its quantity for the total
    // add the total price to the accumulator
    const { price, qty } = currProduct;
    const totalPrice = price * qty;

    return acc + totalPrice;
  }, 0);

  console.log(change);
  req.cart = {
    totalCost: change,
  };


  next();
};

const order = (req, res, next) => {
  const orders = req.body.cart;

  const data = orders.map(order => {

    return{
      product: order.id,
      qty: order.qty,
      stock: {
        size: order.size,
        color: order.color,
      },
      price: order.price
    }
  })

  req.stock = data;
    next();
};

module.exports = {
  cart,
  order,
};
