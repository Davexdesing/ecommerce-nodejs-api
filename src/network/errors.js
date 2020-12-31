const { error } = require("./response");

const errors = (err, res, data) => {
  console.error("[error]", err);

  const message = err.message || "Internal Error";
  const status = err.statusCode || 500;

  error(res, message, status, data);
};

module.exports =  errors ;
