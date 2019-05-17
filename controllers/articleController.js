const {
  selectArticles,
  updateArticle,
  selectComments,
  insertComment
} = require("../models/articleModel");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query, req.params.article_id)
    .then(articles =>
      res.status(200).send({
        articles
      })
    )
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  selectArticles(req.query, req.params.article_id)
    .then(article =>
      res.status(200).send({
        article
      })
    )
    .catch(next);
};

exports.getComments = (req, res, next) => {
  selectComments(req.query, req.params.article_id)
    .then(comments =>
      res.status(200).send({
        comments
      })
    )
    .catch(next);
};

exports.addComment = (req, res, next) => {
  insertComment(req.params, req.body)
    .then(comment => {
      res.status(201).send({
        comment
      });
    })
    .catch(next);
};

exports.amendArticle = (req, res, next) => {
  updateArticle(req.params, req.body.inc_votes)
    .then(article => {
      res.status(200).send({
        article
      });
    })
    .catch(next);
};
