exports.up = function(knex, Promise) {
  // console.log("creating articles table...");

  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.string("body", 5000).notNullable();
    articlesTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable();
    articlesTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  // console.log("removing articles tables...");
  return knex.schema.dropTableIfExists("articles");
};
