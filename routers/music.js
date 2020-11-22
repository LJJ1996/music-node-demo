const Router = require("koa-router");
const musciController = require("../controllers/music");
let musicRouter = new Router();
musicRouter
  .post("/music/add-music", musciController.addMusic)
  .put("/music/update-music", musciController.updateMusic)
  .delete("/music/delete-music", musciController.deleteMusic)
  .get("/music/index", async ctx => {
    ctx.render("index");
  })
  .get("/music/add", async ctx => {
    ctx.render("add");
  })
  .get("/music/edit", musciController.showEdit);

module.exports = musicRouter;
