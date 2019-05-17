const userRouter = require("express").Router();
const { getUser } = require("../controllers/userController");

userRouter.route("/:username").get(getUser);
module.exports = userRouter;
