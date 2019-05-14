const topicRouter = require("express").Router();
const { getAllTopics } = require("../controllers/controllers");

topicRouter.route("/").get(getAllTopics);
// topicRouter.route("/").post(sendTopic);
// topicRouter.route("/:topic_id").patch(amendTopic);
// topicRouter.route("/:topic_id").delete(removeTopic);

module.exports = topicRouter;
