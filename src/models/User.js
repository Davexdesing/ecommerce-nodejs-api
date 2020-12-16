const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let role = {
  values: ["user", "admin"],
  message: "{VALUE} no es un rol valido",
};

const userSchema = new Schema({
  email: {
    required: [true, "El correo es necesario"],
    trim: true,
    unique: true,
    type: String,
    index: true,
  },
  password: {
    required: [true, "El password es necesario"],
    trim: true,
    type: String,
  },
  name: {
    required: [true, "El nombre es necesario"],
    trim: true,
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: role,
  },
  phone: {
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
