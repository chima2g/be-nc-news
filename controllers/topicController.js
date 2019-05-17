const { selectAllTopics } = require("../models/topicModel");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then(topics =>
    res.status(200).send({
      topics
    })
  );
};
