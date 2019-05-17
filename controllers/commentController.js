const { updateComment, deleteComment } = require("../models/commentModel");

exports.amendComment = (req, res, next) => {
  updateComment(req.params, req.body.inc_votes)
    .then(comment => {
      res.status(200).send({
        comment
      });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  deleteComment(req.params)
    .then(comment => {
      res.status(204).send();
    })
    .catch(next);
};
