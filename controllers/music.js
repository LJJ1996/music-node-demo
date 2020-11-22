const musicModal = require("../models/music.js");
const path = require("path");

function optUpload(ctx) {
  const { title, singer, time } = ctx.request.body;
  const { file, filelrc } = ctx.request.files;
  let saveSingObj = {
    title,
    singer,
    time
  };
  if (filelrc) {
    saveSingObj.filelrc = "/public/files" + path.parse(filelrc.path).base;
  }

  if (!file) {
    ctx.throw("歌曲必须上传");
    return;
  }
  saveSingObj.file = "/public/files" + path.parse(file.path).base;
  saveSingObj.uid = 1;
  return saveSingObj;
}

module.exports = {
  /**
   * 添加音乐
   * @param {} ctx
   * @param {*} next
   */
  async addMusic(ctx, next) {
    let saveSingObj = optUpload(ctx);
    let result = await musicModal.addMusicObj(saveSingObj);

    ctx.body = {
      code: "001",
      msg: result.message
    };
  },
  async updateMusic(ctx, next) {
    let saveSingObj = optUpload(ctx);
    let { id } = ctx.request.body;
    Object.assign(saveSingObj, { id });
    let result = await musicModal.updateMusic(saveSingObj);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: result.message
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: result.message
    };
  },
  async deleteMusic(ctx, next) {
    let id = Number(ctx.request.query.id);
    let result = await musicModal.deleteMusicById(id);
    if (result.affectedRows === 0) {
      ctx.body = {
        code: "002",
        msg: result.message
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "删除成功"
    };
  },
  async showEdit(ctx, next) {
    let id = ctx.query.id;
    let musics = await musicModal.findMusicsById(id);
    if (musics.lenght === 0) {
      ctx.throw('歌曲不存在');
      return;
    }
    ctx.render('edit', {
      music: musics[0]
    })
  }
};
