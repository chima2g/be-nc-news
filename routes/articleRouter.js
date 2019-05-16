const articleRouter = require("express").Router();
const {
  getArticles,
  getComments,
  amendArticle
} = require("../controllers/controllers");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id").get(getArticles);
articleRouter.route("/:article_id").patch(amendArticle);
articleRouter.route("/:article_id/comments").get(getComments);
// articleRouter.route("/").post(sendarticle);
// articleRouter.route("/:article_id").delete(removearticle);

module.exports = articleRouter;
