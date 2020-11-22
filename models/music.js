const db = require("./db");

module.exports = {
  addMusicObj: async sing =>
    await db.q(
      "insert into musics (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)",
      Object.values(sing)
    ),
  updateMusic: async sing =>
    await db.q(
      "update musics set title = ?, singer = ?, time = ?, filelrc = ?, file = ?, uid = ? where id = ?",
      Object.values(sing)
    ),
  deleteMusicById: async id =>
    await db.q("delete from musics where id = ?", [id]),
  findMusicsById: async id =>
    await db.q("select * from musics where id = ?", [id])
};
