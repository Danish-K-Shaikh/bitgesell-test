const logger = require("../utils/logger")
module.exports = function (validator) {
  if(typeof validator !== 'function') {
    logger.error("Validator should be of function type");
    process.exit(1)
  }
  return async function (req, res, next) {
    const payload = req.body;
    await validator(payload)
    next()
  };
};
