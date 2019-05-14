const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};

exports.selectAllArticles = () => {
  return connection("articles")
    .select("articles.*")
    .count("articles.article_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(result => {
      return result;
    });
};
