const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};
