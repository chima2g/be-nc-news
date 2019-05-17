exports.up = function(knex, Promise) {
  // console.log("creating comments table...");

  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    commentsTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable(); //    commentsTable.timestamp("created_at");
    commentsTable.string("body", 5000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // console.log("removing comments tables...");
  return knex.schema.dropTableIfExists("comments");
};
