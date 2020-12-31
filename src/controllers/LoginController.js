const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { success, error } = require("../network/response");


const login = async (req, res) => {
  let body = req.body;

  try {
    let user = await User.findOne({ email: body.email });

    let data = {
      id: user.id,
      role: user.role,
      name: user.name,
    };
    if (!user) {
      error(res, "Invalid username or password", 404);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      error(res, "Invalid username or password", 404);
    }

    let token = jwt.sign(
      {
        user: data,
      },
      config.authTokenSecret,
      { expiresIn: 60 * 20 }
    );

    success(res, "", 200, {
      user: user,
      token,
    });
  } catch (err) {
    error(res, "", 500, err)
  }
};

const refreshToken = async (req, res) => {
  try {
    let user = await User.findById(req.user.user.id);

    let data = {
      id: user.id,
      role: user.role,
      name: user.name,
    };

    let token = jwt.sign(
      {
        user: data,
      },
      config.authTokenSecret,
      { expiresIn: 60 * 20 }
    );

    const response = {
      token,
      user
    }

    success(res, "", 200, response);
  } catch (err) {
    error(res, "", 500, err)
  }
};

const forgotPassword = async (req, res) => {};

const register = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      phone: req.body.phone,
    });

    await user.save();

    success(res, "Has been created successfully", 200, user);
  } catch (err) {
    error(res, "", 500, err)
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  refreshToken,
};
