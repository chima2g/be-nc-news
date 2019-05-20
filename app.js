const express = require("express");
const apiRouter = require("./routes/apiRouter");
const {
  routeNotFound,
  handlePSQLErrors,
  handleCustomErrors
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use(handlePSQLErrors);
app.use(handleCustomErrors);

app.all("/*", routeNotFound);

module.exports = app;
