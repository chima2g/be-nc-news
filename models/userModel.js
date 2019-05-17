const connection = require("../db/connection");

exports.selectUser = username => {
  return connection("users")
    .select("*")
    .where(username)
    .then(result => {
      // console.log("result: " + result);
      return result;
    });
};
