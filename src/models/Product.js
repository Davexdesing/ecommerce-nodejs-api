const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const productSchema = new Schema({
  name: {
    required: true,
    trim: true,
    type: String,
    index: true,
  },
  slug: {
    trim: true,
    type: String,
    index: true,
    unique: true
  },
  img: {
    required: false,
    trim: true,
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    required: false,
    trim: true,
    type: Number,
  },
  description: {
    required: false,
    trim: true,
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

}, { toJSON: { virtuals: true } });

productSchema.virtual('stocks', {
  ref: 'Stock',
  localField: '_id',
  foreignField: 'product',
  justOne: false // set true for one-to-one relationship
})

productSchema.plugin(uniqueValidator);


module.exports = model("Product", productSchema);
