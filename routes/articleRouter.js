const articleRouter = require("express").Router();
const {
  getArticle,
  getArticles,
  getComments,
  amendArticle,
  addComment
} = require("../controllers/articleController");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id").get(getArticle);
articleRouter.route("/:article_id").patch(amendArticle);
articleRouter.route("/:article_id/comments").get(getComments);
articleRouter.route("/:article_id/comments").post(addComment);

module.exports = articleRouter;
