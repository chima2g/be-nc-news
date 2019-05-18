const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { methodNotAllowed, handle500, handleCustomErrors } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

//TODO: This handler should be called handlePSQLErrors
app.use((err, req, res, next) => {
  // console.log("error encountered!!!: " + JSON.stringify(err));
  // console.log("err.code: " + err.code);
  // console.log("err.msg: " + err.msg);

  //Note that error codes are sometimes sent through as a string when they should be a
  //number. Could have used == to compensate but wanted to highlight the offending codes, e.g. 23503

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
});

app.use(handleCustomErrors);

app.all("/*", methodNotAllowed);

module.exports = app;
