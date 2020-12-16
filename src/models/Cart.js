const { Schema, model } = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

const cartSchema = new Schema({
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
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

cartSchema.plugin(uniqueValidator);

module.exports = model("Cart", cartSchema);
