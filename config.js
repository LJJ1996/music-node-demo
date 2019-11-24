const path = require("path");

module.exports = {
  viewDir: path.join(__dirname, "views"),
  staticDir: path.resolve("./public"),
  uploadDir: path.resolve("./public/files"),
  appPort: 8888,
  dbConfig: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "node_music"
  }
};
