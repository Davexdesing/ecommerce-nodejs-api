const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { success, error } = require("../network/response");


const login = async (req, res) => {
  let body = req.body;

  try {
    let user = await User.findOne({ email: body.email });

    if (!user) {
      error(res, "Invalid username or password", 404);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      error(res, "Invalid username or password", 404);
    }

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

    success(res, "", 200, {
      user: user,
      token,
    });
  } catch (err) {
    console.log("[error]: ", err)
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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    });

    await user.save();


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

    success(res, "Has been created successfully", 200, response);
  } catch (err) {
    error(res, "", 500, err)
  }
};

const update = async (req,res) => {
  try{

    const id =req.user.user.id;
    const update = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }

    let user = await User.findByIdAndUpdate(id, update, {
      new: true,
      context: "query",
    });

    if (!user) {
      error(res, "Resource not found", 404, "");
      return;
    }

    success(res, "Has been saved successfully", 201, user);
  }catch(err) {
    console.log("[error]: ", err)
    error(res, "", 500, err)
  }
}
const updatePassword = async (req,res) => {
  try{

    const id =req.user.user.id;

    const update = {
      password: bcrypt.hashSync(req.body.password, 10),
    }

    let verify = await User.findById(req.user.user.id);

    if (!verify) {
      error(res, "Resource not found", 404, "");
      return;
    }


    if (!bcrypt.compareSync(req.body.oldPassword, verify.password)) {
      error(res, "Invalid password", 400);
      return;
    }


    let user = await User.findByIdAndUpdate(id, update, {
      new: true,
      context: "query",
    });

  

    success(res, "Has been saved successfully", 201, user);
  }catch(err) {
    
  }
}

module.exports = {
  login,
  register,
  forgotPassword,
  refreshToken,
  update,
  updatePassword
};
