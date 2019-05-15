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
    it("GET returns an articles object containing an array of the articles", () => {
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
    it("GET by default sorts articles by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("author", {
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
    it('GET - responds with "Bad Request!" & status: 400 when given an invalid column', () => {
      return request(app)
        .get("/api/articles?sort_by=unknown_column")
        .expect(400);
    });
    it("GET can sort by a given order", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("author", {
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
    it('GET - responds with "Bad Request!" & status: 400 when given an invalid order', () => {
      return request(app)
        .get("/api/articles?order=unknown_order")
        .expect(400);
    });
    it("GET can filter articles by a specified author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.have.length(3);
        });
    });
    it('GET - responds with "Bad Request!" & status: 400 when given an invalid author', () => {
      return request(app)
        .get("/api/articles?author=unknown_author")
        .expect(400);
    });
    it("GET can filter articles by a specified topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.have.length(1);
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    it.only("GET returns an articles object containing an array of articles with the given article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.have.length(1);
          expect(articles[0].hasOwnProperty("author")).to.equal(true);
          expect(articles[0].hasOwnProperty("title")).to.equal(true);
          expect(articles[0].hasOwnProperty("article_id")).to.equal(true);
          expect(articles[0].hasOwnProperty("body")).to.equal(true);
          expect(articles[0].hasOwnProperty("topic")).to.equal(true);
          expect(articles[0].hasOwnProperty("created_at")).to.equal(true);
          expect(articles[0].hasOwnProperty("votes")).to.equal(true);
          expect(articles[0].hasOwnProperty("comment_count")).to.equal(true);
          expect(articles[0].comment_count).to.eql("13");
        });
    });
  });
});
