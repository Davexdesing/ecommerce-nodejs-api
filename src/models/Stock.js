const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const stockSchema = new Schema({
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
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},  { toJSON: { virtuals: true } });

stockSchema.virtual('stockimages', {
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
