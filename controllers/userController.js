const { selectUser } = require("../models/userModel");

exports.getUser = (req, res, next) => {
  selectUser(req.params)
    .then(user =>
      res.status(200).send({
        user
      })
    )
    .catch(next);
};
