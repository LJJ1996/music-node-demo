const Router = require("koa-router");
const musciController = require("../controllers/music");
let musicRouter = new Router();
musicRouter
  .post("/music/add-music", musciController.addMusic)
  .put("/music/update-music", musciController.updateMusic)
  .get("/music/index", async ctx => {
    ctx.render("index");
  })
  .get("/music/edit", async ctx => {
    ctx.render("edit");
  })
  .get("/music/add", async ctx => {
    ctx.render("add");
  });

module.exports = musicRouter;
