module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || "root",
    password: process.env.DEV_DB_PASSWORD || "1234",
    database: process.env.DEV_DB_DATABASE || "be-simple",
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
