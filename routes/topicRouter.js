const topicRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topicController");

topicRouter.route("/").get(getAllTopics);

module.exports = topicRouter;
