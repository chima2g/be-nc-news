const connection = require("../db/connection");

exports.selectAllTopics = () => {
  console.log("Erm... ");
  console.log("connection: " + connection);
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};
