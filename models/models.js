const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};

/*  Selects all articles by default or all articles with the given article_id if supplied
 */
exports.selectArticles = (
  { sort_by = "author", order = "desc", author, topic },
  article_id
) => {
  if (order !== "asc" && order !== "desc")
    return Promise.reject({ code: 22023 });

  if (article_id && isNaN(parseInt(article_id)))
    return Promise.reject({ code: 22023 });

  const selectedColumns = [
    "articles.author",
    "articles.title",
    "articles.article_id",
    "articles.topic",
    "articles.created_at",
    "articles.votes"
  ];

  if (article_id) selectedColumns.push("articles.body"); // Include the body if we're asking for results for a single article

  return connection("articles")
    .select(selectedColumns)
    .count("articles.article_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(queryBuilder => {
      queryBuilder.orderBy(sort_by, order);
      if (author) queryBuilder.where("articles.author", "=", author);
      if (topic) queryBuilder.where("articles.topic", "=", topic);
      if (article_id)
        queryBuilder.having("articles.article_id", "=", article_id);
    })
    .then(result => {
      // console.log("result: " + result);
      if (result.length === 0) return Promise.reject({ code: 22023 });
      else return result;
    });
};

exports.updateArticle = (id, updateVariables) => {
  return connection("articles")
    .increment("votes", updateVariables.inc_votes)
    .where(id)
    .returning("*")
    .then(([result]) => {
      // console.log("returning: " + JSON.stringify(result));

      //TODO: Not whether to handle 404 errors like this... think about it when you're feeling better
      //... that said, this is causing the catch block to receive a blank object anyway
      if (result.length === 0)
        return Promise.reject({ msg: "Page not Found!", error: 404 });
      else return result;
    });
};

exports.selectComments = (
  { sort_by = "created_at", order = "desc" },
  article_id
) => {
  const selectedColumns = [
    "comments.comment_id",
    "comments.author",
    "comments.votes",
    "comments.created_at",
    "comments.body"
  ];
};
