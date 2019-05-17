const connection = require("../db/connection");

exports.updateComment = (params, votes = 0) => {
  return connection("comments")
    .increment("votes", votes)
    .where(params)
    .returning("*")
    .then(([result]) => {
      // console.log("returning: " + JSON.stringify(result));
      return result;

      //TODO: Not sure whether to handle 404 errors like this... think about it when you're feeling better
      //... that said, this is causing the catch block to receive a blank object anyway
      // if (result.length === 0)
      //   return Promise.reject({ msg: "Page not Found!", error: 404 });
      // else return result;
    });
};

exports.deleteComment = params => {
  return connection("comments")
    .del()
    .where(params)
    .then(result => {
      // console.log("returning: " + JSON.stringify(result));
      return {};

      //TODO: Not sure whether to handle 404 errors like this... think about it when you're feeling better
      //... that said, this is causing the catch block to receive a blank object anyway
      // if (result.length === 0)
      //   return Promise.reject({ msg: "Page not Found!", error: 404 });
      // else return result;
    });
};
