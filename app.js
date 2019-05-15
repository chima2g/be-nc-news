const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  //   console.log("err: " + JSON.stringify(err));

  const errorCodes = { 42703: "Bad request!" };
  if (errorCodes[err.code]) res.status(400).send({ msg: errorCodes[err.code] });
  else next;
});

app.all("/*", routeNotFound);

// app.use(handle500);

module.exports = app;
