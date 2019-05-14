const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const articleRouter = require("./articleRouter");
const { methodNotAllowed } = require("../errors");

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
