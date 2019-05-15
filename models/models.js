const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};

exports.selectAllArticles = (
  { sort_by = "author", order = "desc", author, topic },
  article_id
) => {
  if (order !== "asc" && order !== "desc")
    return Promise.reject({ code: 22023 });

  if (article_id && isNaN(parseInt(article_id)))
    return Promise.reject({ code: 22023 });

  return connection("articles")
    .select("articles.*")
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
      console.log("result: " + result);
      if (result.length === 0) return Promise.reject({ code: 22023 });
      else return result;
    });
};
