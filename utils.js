exports.renameKeys = (myArray, keyToChange, newKey) => {
  const newArr = myArray.map(objInArray => {
    const { [keyToChange]: varToKeep, ...remainingElements } = objInArray;
    const newObj = { [newKey]: varToKeep, ...remainingElements };
    return newObj;
  });
  return newArr;
};

exports.createRef = (objectArray, lookupKey, lookupValue) => {
  let lookup = {};

  if (objectArray)
    objectArray.forEach((objectInArray, index) => {
      let key = objectInArray[lookupKey];
      let value = index + 1;
      lookup[key] = value;
    });

  return lookup;
};

exports.formatComments = (comments, lookup) => {
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

module.exports = { renameKeys, createRef, formatComments };
