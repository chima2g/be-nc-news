# Introduction

Northcoders News is a social news aggregation, web content rating, and discussion website. 

Its range of articles are searchable by topic and author. Each article has user curated ratings and can be up or down voted. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

This back-end API is a server that facilitates the storage and retrieval of user, article and comment data in a PSQL database. It is used by the [front-end](#useful-links) to display the Northcoders News website.

# Quick start

- Clone the repo from your terminal using the following command:

```bash
git clone https://github.com/chima2g/be-nc-news.git
```

- Run `npm i`
- Run `npm start`

# Routes

The server has following endpoints:

```http
GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api
```
---

```http
GET /api/topics
```

#### Responds with

- an array of topic objects, each of which has the following properties:
  - `slug`
  - `description`

---

```http
GET /api/users/:username
```

#### Responds with

- a user object which has the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
GET /api/articles/:article_id
```

#### Responds with

- an article object, which has the following properties:

  - `author` which is the `username` of a users object
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id

---

```http
PATCH /api/articles/:article_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

#### Responds with

- the updated article

---

```http
POST /api/articles/:article_id/comments
```

#### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment

---

```http
GET /api/articles/:article_id/comments
```

#### Responds with

- an array of comments for the given `article_id` of which each comment has the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` of a users object
  - `body`

#### Accepts queries

- `sort_by`, which sorts the articles by any valid column (defaults to created_at)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

---

```http
GET /api/articles
```

#### Responds with

- an `articles` array of article objects, each of which has the following properties:
  - `author` which is the `username` of a users object
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id

#### Accepts queries

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query

---

```http
PATCH /api/comments/:comment_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

#### Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

#### Shall

- delete the given comment by `comment_id`

#### Responds with

- status 204 and no content

---

# Useful Links

[Front end repo](https://github.com/chima2g/fe-nc-news/)

[Deployed version](https://be-nc-news-chima2g.herokuapp.com/)