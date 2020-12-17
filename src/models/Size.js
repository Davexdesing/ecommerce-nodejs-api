const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const sizeSchema = new Schema({
  name: {
    required: [true, "El correo es necesario"],
    trim: true,
    type: String,
    index: true,
  },
  quantity: {
    required: true,
    type: Number,
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },

});


sizeSchema.plugin(uniqueValidator);


module.exports = model("Size", sizeSchema);
