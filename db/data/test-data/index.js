// require in and export out all test data
const topicData = require("./topics.js");
const userData = require("./users.js");
const articleData = require("./articles.js");
const commentData = require("./comments.js");

exports.module = { topicData, userData, articleData, commentData };
