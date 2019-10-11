const Router = require('koa-router');
let musicRouter = new Router();
musicRouter.get('/music/index', async ctx => {
    ctx.render('index');
}).get('/music/edit' , async ctx => {
    ctx.render('edit');
}).get('/music/add' , async ctx => {
    ctx.render('add');
});

module.exports = musicRouter;