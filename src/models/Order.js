const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
    cart: [
      {
        stock: {
          size: {
            type: String,
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Stock",
          required: true,
        },
        qty: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    address: {
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      zip: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
    },
    paymentId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } }
);

orderSchema.plugin(uniqueValidator);

module.exports = model("Order", orderSchema);
