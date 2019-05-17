const commentRouter = require("express").Router();
const {
  amendComment,
  removeComment
} = require("../controllers/commentController");

commentRouter.route("/:comment_id").patch(amendComment);
commentRouter.route("/:comment_id").delete(removeComment);

module.exports = commentRouter;
