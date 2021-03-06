process.env.NODE_ENV = "test";

const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  it("GET responds with status 404 for a non-existent route", () => {
    return request(app)
      .get("/non-existent-route")
      .expect(404);
  });
  describe("/api", () => {
    // it.only("GET status:200", () => {
    //   return request(app)
    //     .get("/api")
    //     .expect(200)
    //     .then(({ body }) => {
    //       expect(body.ok).to.equal(true);
    //     });
    // });
    it("GET status:200 and an object containing an array of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).to.have.length(6);
        });
    });

    describe("/api/topics", () => {
      it("GET returns status 200 & topics object containing an array of the topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.have.length(3);
            expect(topics[0]).to.have.keys(["slug", "description"]);
          });
      });
      it("PUT returns status 405 as unsupported method", () => {
        return request(app)
          .put("/api/topics")
          .expect(405);
      });
    });

    describe("/api/articles", () => {
      it("GET returns an articles object containing an array of the articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.have.length(12);
            expect(articles[0]).to.have.keys([
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            ]);
          });
      });
      it("GET by default sorts articles by date in descending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET can sort by a given column", () => {
        return request(app)
          .get("/api/articles?sort_by=title")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.sortedBy("title", {
              descending: true
            });
          });
      });
      it('GET - responds with "Bad request!" & status: 400 when given an invalid column', () => {
        return request(app)
          .get("/api/articles?sort_by=unknown_column")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad request!");
          });
      });
      it("GET can sort by a given order", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET can sort by a given column and a given order", () => {
        return request(app)
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.sortedBy("title", {
              descending: false
            });
          });
      });
      it('GET - responds with "Bad request!" & status: 400 when given an invalid order', () => {
        return request(app)
          .get("/api/articles?order=unknown_order")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad request!");
          });
      });
      it("GET can filter articles by a specified author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.have.length(3);
          });
      });
      it('GET - responds with "Article not found!" & status: 404 when given an invalid author', () => {
        return request(app)
          .get("/api/articles?author=unknown_author")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Article not found!");
          });
      });
      it("GET can filter articles by a specified topic", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.have.length(1);
          });
      });
      it("PUT returns status 405 as unsupported method", () => {
        return request(app)
          .put("/api/articles")
          .expect(405);
      });
      describe("/api/articles/:article_id", () => {
        it("GET returns an articles object containing an array of articles with the given article_id", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).to.have.keys([
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              ]);
              expect(article.comment_count).to.eql("13");
            });
        });

        it('GET - responds with "Bad request!" & status: 400 when given an invalid article id', () => {
          return request(app)
            .get("/api/articles/unknown_article_id")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("Bad request!");
            });
        });
        it("PATCH accepts a votes object, responds with 200 & the updated article", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 3 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.votes).to.eql(103);
            });
        });
        it('PATCH - responds with "Bad request!" & status: 400 when given a non-integer article id', () => {
          return request(app)
            .patch("/api/articles/unknown_article_id")
            .send({ inc_votes: 3 })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("Bad request!");
            });
        });
        it('PATCH - responds with "Bad request!" & status: 400 when given a non-integer number of votes', () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "invalid_number" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("Bad request!");
            });
        });
        it("PATCH - defaults to 0 votes when votes parameter isn't supplied", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.votes).to.eql(100);
            });
        });
        it('PATCH - responds with "Article not found!" & status: 404 when given an integer article id that doesn\'t exist', () => {
          return request(app)
            .patch("/api/articles/9999")
            .send({ inc_votes: 3 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql("Article not found!");
            });
        });
        it("PUT returns status 405 as unsupported method", () => {
          return request(app)
            .put("/api/articles/1")
            .expect(405);
        });
        describe("/api/articles/:article_id/comments", () => {
          it("GET returns status 200 & an empty array when an article exists but has no comments", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.have.length(0);
              });
          });
          it("GET returns status 200 & an array of comments for the given article_id", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.have.length(13);
                expect(comments[0]).to.have.keys([
                  "comment_id",
                  "author",
                  "votes",
                  "created_at",
                  "body"
                ]);
              });
          });
          it("GET sorts comments by created_at in descending order by default", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("GET sorts comments by the given order", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("created_at", {
                  descending: false
                });
              });
          });
          it("GET sorts comments by the given column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=author")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("author", {
                  descending: true
                });
              });
          });
          it("GET responds with 'Article not found!' & status: 404 when given an integer article id that doesn't exist", () => {
            return request(app)
              .get("/api/articles/9999/comments")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Article not found!");
              });
          });
          it("POST accepts a votes object, responds with 201 & the posted comment", () => {
            const input = {
              username: "rogersop",
              body: "I'm not sure this is the best use of anyone's time."
            };

            return request(app)
              .post("/api/articles/1/comments")
              .send(input)
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment.author).to.eql(input.username);
                expect(comment.body).to.eql(input.body);
                expect(comment).to.have.keys([
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                ]);
              });
          });
          it("POST responds with 'Bad request!' & status: 400 when missing parameters", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Bad request!");
              });
          });
          it("POST responds with 'Article not found!' & status: 404 when given an invalid article id", () => {
            const input = {
              username: "rogersop",
              body: "I'm not sure this is the best use of anyone's time."
            };

            return request(app)
              .post("/api/articles/9999/comments")
              .send(input)
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Article not found!");
              });
          });
          it("PUT returns status 405 as unsupported method", () => {
            return request(app)
              .put("/api/articles/1/comments")
              .expect(405);
          });
        });
      });
    });
    describe("/api/comments/:comment_id", () => {
      it("PATCH accepts a votes object, responds with 200 & the updated comment", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: 12 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment.votes).to.eql(26);
            expect(comment).to.have.keys([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            ]);
          });
      });
      it("PATCH - defaults to 0 votes when votes parameter isn't supplied", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({})
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment.votes).to.eql(14);
          });
      });
      it("PATCH responds with 'Comment not found!' & status: 404 when given an invalid comment id", () => {
        return request(app)
          .patch("/api/comments/9999")
          .send({ inc_votes: 12 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Comment not found!");
          });
      });
      it("DELETE deletes the comment corresponding to the given comment_id & responds with 204 and no content", () => {
        return request(app)
          .delete("/api/comments/2")
          .expect(204);
      });
      it("DELETE responds with 'Comment not found!' & status: 404 when given an invalid comment id", () => {
        return request(app)
          .delete("/api/comments/9999")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Comment not found!");
          });
      });
      it("PUT returns status 405 as unsupported method", () => {
        return request(app)
          .put("/api/comments/2")
          .expect(405);
      });
    });
    describe("/api/users/:username", () => {
      it("GET returns status 200 and a user object", () => {
        return request(app)
          .get("/api/users/rogersop")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.have.keys(["username", "avatar_url", "name"]);
          });
      });
      it("GET responds with 'User not found!' & status: 404 when given an invalid comment id", () => {
        return request(app)
          .get("/api/users/unknown_username")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User not found!");
          });
      });
      it("PUT returns status 405 as unsupported method", () => {
        return request(app)
          .put("/api/users/rogersop")
          .expect(405);
      });
    });
  });
});
