const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { methodNotAllowed, handle500, handleCustomErrors } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  //   console.log("error encountered!!!: " + JSON.stringify(err));
  // console.log("err.code: " + err.code);
  // console.log("err.msg: " + err.msg);
  const errorCodes = {
    "22P02": "Bad request!",
    42703: "Bad request!",
    23502: "Bad request!"
  };

  if (errorCodes[err.code]) res.status(400).send({ msg: errorCodes[err.code] });
  else next(err);
});

app.use(handleCustomErrors);

app.all("/*", methodNotAllowed);

module.exports = app;
