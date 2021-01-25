const  { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new Schema({
  name: {
    required: [true, "El correo es necesario"],
    trim: true,
    type: String,
    index: true,
  },
  slug: {
    trim: true,
    type: String,
    index: true,
  },
  img: {
    required: false,
    trim: true,
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  deleted: {
    required: false,
    type: Boolean,
    default: false
  },
  parent: { type: String, ref: 'Category' },
},  { toJSON: { virtuals: true } });

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false // set true for one-to-one relationship
})
categorySchema.plugin(uniqueValidator);

module.exports = model("Category", categorySchema);
