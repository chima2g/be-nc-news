const connection = require("../db/connection");

exports.selectUser = username => {
  return connection("users")
    .select("*")
    .where(username)
    .then(([result]) => {
      if (!result)
        return Promise.reject({ msg: "User not found!", status: 404 });
      else return result;
    });
};
