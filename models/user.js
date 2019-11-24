const db = require("./db");

module.exports = {
  getUsers: async (ctx, next) => await db.q("select * from users", []),
  findUserByUsername: async username =>
    await db.q("select * from users where username = ?", username),
  registerUser: async (...user) =>
    await db.q(
      "insert into users (username , password , email) values (? , ? , ?)",
      user
    )
};
