const koa = require('koa');
const path = require('path');
// 创建服务器
let app = new koa();

const musicRouter = require('./routers/music');
const userRouter = require('./routers/user');

// 开启服务器
app.listen(8888, () => {
    console.log('run in 8888 port');
})

// 模板渲染
const render = require('koa-art-template');
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
});

// 为了给static重写url
app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/public')) {
        ctx.url = ctx.url.replace('/public', '');
    }
    await next();
})

// 处理静态资源
app.use(require('koa-static')(path.resolve('./public')))

// 中间件使用列表
app.use(userRouter.routes());
app.use(musicRouter.routes());

// 处理405 方法不匹配和501 方法未实现

app.use(userRouter.allowedMethods());

