const User = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const { success, error } = require("../network/response");

const all = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let user = await User.find({}).skip(from).limit(limited).exec();
    let count = await User.count();

    success(res, "", 200, {
      user: user,
      count: count,
    });
  } catch (err) {
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

const create = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      birthday: req.body.birthday,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    });

    await user.save();

    success(res, "Has been saved successfully", 201, user);
  } catch (err) {
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);

    if (!user) {
      error(res, "Resource not found", 404, "");
    }

    success(res, "", 200, user);
  } catch (err) {
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;

    const update = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    };
    if (req.body.password) {
      update.password = bcrypt.hashSync(req.body.password, 10);
    }

    let user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!user) {
      error(res, "Resource not found", 404, "");
    }

    success(res, "Has been saved successfully", 201, user);
  } catch (err) {
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

module.exports = {
  all,
  create,
  update,
  show,
};
