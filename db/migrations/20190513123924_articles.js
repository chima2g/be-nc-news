exports.up = function(knex, Promise) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.string("body", 5000);
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.string("created_at").defaultTo(new Date());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles tables...");
  return knex.schema.dropTable("articles");
};
