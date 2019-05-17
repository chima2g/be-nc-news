const commentRouter = require("express").Router();
const { amendComment } = require("../controllers/controllers");

//commentRouter.route("/:comment_id").patch(amendComment);

module.exports = commentRouter;
