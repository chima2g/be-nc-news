const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter");
const userRouter = require("./userRouter");

apiRouter.route("/").get((req, res) => res.send({ ok: true }));

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
