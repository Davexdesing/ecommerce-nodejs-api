const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");


const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    cart: {
      totalQty: {
        type: Number,
        default: 0,
        required: true,
      },
      totalCost: {
        type: Number,
        default: 0,
        required: true,
      },
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          qty: {
            type: Number,
            default: 0,
          },
          price: {
            type: Number,
            default: 0,
          },
          title: {
            type: String,
          },
          productCode: {
            type: String,
          },
        },
      ],
    },
    address: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Delivered: {
      type: Boolean,
      default: false,
    },
  },
);


orderSchema.plugin(uniqueValidator);

module.exports = model("Order", orderSchema);
