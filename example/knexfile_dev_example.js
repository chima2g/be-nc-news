const ENV = process.env.NODE_ENV || "development";
// check the environment and default to 'development' if undefined

const dbConfig = {
  development: {
    client: "pg",
    connection: {
      database: "be_nc_news"
      //   username: "yourusername",
      //   password: "yourpassword"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  test: {
    client: "pg",
    connection: {
      database: "be_nc_news_test"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};

module.exports = dbConfig[ENV];
