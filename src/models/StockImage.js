const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const stockImageSchema = new Schema({
  image: {
    required: true,
    type: String,
  },

  stock: {
    type: Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
});

stockImageSchema.plugin(uniqueValidator);

module.exports = model("StockImage", stockImageSchema);