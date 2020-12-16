// middleware to validate token
const { config } = require("../config");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.authTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "You are not authorized",
          ok: false,
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authorized",
      ok: false,
    });
  }
};

module.exports = {
  verifyToken,
};
