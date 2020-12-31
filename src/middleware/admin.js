const User = require("../models/User");
const { success, error } = require("../network/response");

const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user.user.id) {
      error(res, "You are not logged in", 401, "");
    }

    const user = await User.findById(req.user.user.id);

    if (user.role !== "admin") {
      error(res, "You are not authorized", 401, "");
    }

    next();
  } catch (err) {
    console.log(err);
    error(res, "", 500, err);
  }
};

export default verifyAdmin;
