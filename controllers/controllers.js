const { selectAllTopics, selectAllArticles } = require("../models/models.js");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then(topics =>
    res.status(200).send({
      topics
    })
  );
};

exports.getAllArticles = (req, res, next) => {
  selectAllArticles(req.query).then(articles =>
    res.status(200).send({
      articles
    })
  );
};
