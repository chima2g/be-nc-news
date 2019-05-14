const allData = require("../data");
const { topicData, userData, articleData, commentData } = allData.module;
const {
  renameKeys,
  createRef,
  formatComments,
  formatCreationDate
} = require("../../utils");

const articleLookup = createRef(articleData, "title");
let amendedComments = formatComments(amendedComments, articleLookup);
amendedComments = renameKeys(commentData, "created_by", "author");
amendedComments = formatCreationDate(amendedComments);
const amendedArticles = formatCreationDate(articleData);

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(() => {
      return knex("articles")
        .insert(amendedArticles)
        .returning("*");
    })
    .then(() => {
      return knex("comments")
        .insert(amendedComments)
        .returning("*");
    });
};
