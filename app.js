const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");

//TODO: Exoport error handling to above unused error handlers

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  //   console.log("error encountered!!!: " + JSON.stringify(err));

  const errorCodes = { 22023: "Bad request!", 42703: "Bad request!" };
  if (errorCodes[err.code]) res.status(400).send({ msg: errorCodes[err.code] });
  else next;
});

app.all("/*", routeNotFound);

module.exports = app;
