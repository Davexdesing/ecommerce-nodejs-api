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
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},  { toJSON: { virtuals: true } });

stockSchema.virtual('images', {
  ref: 'StockImage',
  localField: '_id',
  foreignField: 'stock',
  justOne: false,
});

stockSchema.virtual('sizes', {
  ref: 'Size',
  localField: '_id',
  foreignField: 'stock',
  justOne: false,
});

stockSchema.plugin(uniqueValidator);

module.exports = model("Stock", stockSchema);
