const articleRouter = require("express").Router();
const { getAllArticles } = require("../controllers/controllers");

articleRouter.route("/").get(getAllArticles);
// articleRouter.route("/").post(sendarticle);
// articleRouter.route("/:article_id").patch(amendarticle);
// articleRouter.route("/:article_id").delete(removearticle);

module.exports = articleRouter;
