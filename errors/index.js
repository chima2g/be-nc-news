exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  // console.log("error encountered!!!: " + JSON.stringify(err));
  // console.log("err.code: " + err.code);
  // console.log("err.msg: " + err.msg);

  //Note that error codes are sometimes sent through as a string when they should be an
  //integer. Could have used == to compensate but wanted to highlight the offending codes, e.g. 23503

  const badRequest = "Bad request!";
  const notFound = "Article not found!";

  const errorCodes = {
    "22P02": badRequest,
    42703: badRequest,
    23502: badRequest,
    "23503": notFound
  };

  if (errorCodes[err.code])
    res
      .status(errorCodes[err.code] === badRequest ? 400 : 404)
      .send({ msg: errorCodes[err.code] });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
