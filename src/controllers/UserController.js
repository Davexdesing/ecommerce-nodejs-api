const User = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const all = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let user = await User.find({}).skip(from).limit(limited).exec();
    let count = await User.count();

    res.json({
      data: user,
      count: count,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    });

    await user.save();

    res.json({
      data: user,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);

    res.json({
      data: user,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;

    const update = {
      name: req.body.name,
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
      context: 'query' 
    });

    if (!user) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: user,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      err,
      message: "Ups, Hava a problem!",
    });
  }
};

module.exports = {
  all,
  create,
  update,
  show,
};
