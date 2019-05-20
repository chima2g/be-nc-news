const listEndpoints = require("express-list-endpoints");
const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter");
const userRouter = require("./userRouter");
const { methodNotAllowed } = require("../errors");

// apiRouter.route("/").get((req, res) => res.send({ ok: true }));

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

const endpoints = listEndpoints(apiRouter);
apiRouter.route("/").get((req, res) => res.send({ endpoints: endpoints }));

apiRouter.all("/*", methodNotAllowed);

module.exports = apiRouter;
