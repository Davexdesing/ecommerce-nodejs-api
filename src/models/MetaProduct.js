const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const MetaProductSchema = new Schema({
  key: {
    required: true,
    type: String,
  },
value: {
    required: true,
    type: String,
},
  stock: {
    type: Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
});

MetaProductSchema.plugin(uniqueValidator);

module.exports = model("MetaProduct", MetaProductSchema);