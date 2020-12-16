const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const stockSchema = new Schema({
  price: {
    required: false,
    trim: true,
    type: Number,
  },
  color: {
    required: true,
    trim: true,
    type: String,
  },
  sizes: [
    {
      size: {
      type: String,
      },
      available: {
        type: Boolean,
        default: true
      }
    },
  ] ,
  principal: {
    required: true,
    type: Boolean,
    default: false
  },
  empty: {
    required: true,
    type: Boolean,
    default: true
  },
  images: [
    {
      required: true,
      type: String,
    },
  ],
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

stockSchema.plugin(uniqueValidator);

module.exports = model("Stock", stockSchema);
