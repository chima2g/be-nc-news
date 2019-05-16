const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  //   console.log("error encountered!!!: " + JSON.stringify(err));
  // console.log("err.code: " + err.code);
  // console.log("err.msg: " + err.msg);

  const errorCodes = {
    22023: "Bad request!",
    "22P02": "Bad request!",
    42703: "Bad request!"
  };

  if (err.code === 522023) console.log("Interesting"); //Delete Me

  if (errorCodes[err.code]) res.status(400).send({ msg: errorCodes[err.code] });
  else next(err);
});

app.use((err, req, res, next) => {
  //   console.log("error encountered!!!: " + JSON.stringify(err));
  // if (err.code && err.msg) res.status(code).send(msg);
});

app.all("/*", routeNotFound);

module.exports = app;
