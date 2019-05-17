const articleRouter = require("express").Router();
const {
  getArticles,
  getComments,
  amendArticle,
  addComment
} = require("../controllers/articleController");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id").get(getArticles);
articleRouter.route("/:article_id").patch(amendArticle);
articleRouter.route("/:article_id/comments").get(getComments);
articleRouter.route("/:article_id/comments").post(addComment);
// articleRouter.route("/").post(sendarticle);
// articleRouter.route("/:article_id").delete(removearticle);

module.exports = articleRouter;
