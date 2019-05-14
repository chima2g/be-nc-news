process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe("/api/topics", () => {
    it("GET returns status 200 & topics object containing an array of the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.have.length(3);
          expect(topics[0].hasOwnProperty("slug")).to.equal(true);
          expect(topics[0].hasOwnProperty("description")).to.equal(true);
        });
    });
  });

  describe("/api/articles", () => {
    it("GET returns status 200 & articles object containing an array of the articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.have.length(12);
          expect(articles[0].hasOwnProperty("author")).to.equal(true);
          expect(articles[0].hasOwnProperty("title")).to.equal(true);
          expect(articles[0].hasOwnProperty("article_id")).to.equal(true);
          expect(articles[0].hasOwnProperty("topic")).to.equal(true);
          expect(articles[0].hasOwnProperty("created_at")).to.equal(true);
          expect(articles[0].hasOwnProperty("votes")).to.equal(true);
          expect(articles[0].hasOwnProperty("comment_count")).to.equal(true);
        });
    });
  });
});
