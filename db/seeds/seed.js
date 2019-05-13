const allData = require("../data");
const { topicData, userData, articleData, commentData } = allData.module;

// topics
// users
// articles
// comments

const renameKeys = (myArray, keyToChange, newKey) => {
  const newArr = myArray.map(objInArray => {
    const { [keyToChange]: varToKeep, ...remainingElements } = objInArray;
    const newObj = { [newKey]: varToKeep, ...remainingElements };
    return newObj;
  });
  return newArr;
};

const createRef = (objectArray, lookupKey, lookupValue) => {
  let lookup = {};

  if (objectArray)
    objectArray.forEach((objectInArray, index) => {
      let key = objectInArray[lookupKey];
      let value = index + 1;
      lookup[key] = value;
    });

  return lookup;
};

const formatComments = (comments, lookup) => {
  const newArr = comments.map(comment => {
    const { belongs_to, ...otherDetails } = comment;
    const changedComment = {
      article_id: lookup[comment.belongs_to],
      ...otherDetails
    };

    return changedComment;
  });

  return newArr;
};

let amendedComments = renameKeys(commentData, "created_by", "author");
const lookup = createRef(articleData, "title");
amendedComments = formatComments(amendedComments, lookup);

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
        .insert(articleData)
        .returning("*");
    })
    .then(() => {
      return knex("comments")
        .insert(amendedComments)
        .returning("*");
    });
};
