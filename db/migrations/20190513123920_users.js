exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTable => {
    // console.log("creating users table...");
    usersTable.string("username").primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  // console.log("removing users tables...");
  return knex.schema.dropTableIfExists("users");
};
