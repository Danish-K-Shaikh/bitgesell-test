module.exports = function CustomError(errors) {
  if (typeof this === "undefined") {
    throw new Error(
      "CustomError is a constructor, please initiale it with new keyword"
    );
  }
  // this.errors = {errors: [{ type: "", msg: "" }], httpStatusCode: ""} // type could either be technical or functional
  this.errorObj = formatError(errors);
};

function formatError(errors) {
  if (!(errors instanceof Array)) {
    let { error, httpStatusCode } = getErrorObj(errors);
    if (!httpStatusCode) httpStatusCode = 500;
    return { errors: [error], httpStatusCode };
  }

  let httpStatusCode;
  const errorArr = errors.map((erorr) => {
    let errorObj = getErrorObj(erorr);
    if (errorObj.httpStatusCode && !httpStatusCode) httpStatusCode = errorObj.httpStatusCode;
    return errorObj.error;
  });
  if (!httpStatusCode) httpStatusCode = 500;
  
  return { errors: errorArr, httpStatusCode };
}

function getErrorObj(err) {
  let obj = {};
  let httpStatusCode;
  if (typeof err === "string") {
    obj.msg = errors;
    obj.type = "Technical";
  } else if (typeof err === "object") {
    obj.msg = err.msg || "Internal server error";
    obj.type = err.type || "Technical";
    if (err.httpStatusCode) httpStatusCode = err.httpStatusCode;
  }
  return { error: obj, httpStatusCode };
}
