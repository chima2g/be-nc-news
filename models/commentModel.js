const connection = require("../db/connection");

exports.updateComment = (params, votes = 0) => {
  return connection("comments")
    .increment("votes", votes)
    .where(params)
    .returning("*")
    .then(([result]) => {
      // console.log("returning: " + JSON.stringify(result));

      if (!result)
        return Promise.reject({ msg: "Comment not found!", status: 404 });
      else return result;
    });
};

exports.deleteComment = params => {
  return connection("comments")
    .del()
    .where(params)
    .then(result => {
      // console.log("returning: " + JSON.stringify(result));
      if (!result)
        return Promise.reject({ msg: "Comment not found!", status: 404 });
      else return {};
    });
};
