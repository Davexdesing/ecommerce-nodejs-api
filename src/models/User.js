const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let role = {
  values: ["user", "admin"],
  message: "{VALUE} no es un rol valido",
};

const userSchema = new Schema({
  email: {
    required: true,
    trim: true,
    unique: true,
    type: String,
    index: true,
  },
  password: {
    required: true,
    trim: true,
    type: String,
  },
  firstname: {
    required: true,
    trim: true,
    type: String,
  },
  lastname: {
    required: true,
    trim: true,
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: role,
  },
  birthday: {
    type: String,
    required: true,
    trim: true
  },
  address: [
    {
      address: {
        type: String,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};
userSchema.plugin(uniqueValidator);

module.exports = model("User", userSchema);
