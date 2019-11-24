const koa = require("koa");
// 创建服务器
let app = new koa();

const musicRouter = require("./routers/music");
const userRouter = require("./routers/user");
// const bodyParser = require("koa-bodyparser");
const formaidable = require("koa-formidable");
const session = require("koa-session");

const { appPort, viewDir, staticDir, uploadDir } = require("./config");
// 开启服务器
app.listen(appPort, () => {
  console.log(`run in ${appPort} port`);
});

// 模板渲染
const render = require("koa-art-template");
render(app, {
  root: viewDir,
  extname: ".html",
  debug: process.env.NODE_ENV !== "production"
});

const error = require("./middleware/error");
app.use(error());
const rewriteUrl = require("./middleware/rewrite");
// 为了给static重写url
app.use(
  rewriteUrl([
    { regex: /abc/, dist: "/user/login" },
    { regex: /\/public(.*)/, dist: null },
    { src: "/", dist: "/user/login" }
  ])
);

// 处理静态资源
app.use(require("koa-static")(staticDir));

let store = {
  storage: {},
  set(key, session) {
    this.storage[key] = session;
  },
  get(key) {
    return this.storage[key];
  },
  destroy(key) {
    delete this.storage[key];
  }
};

// 处理session
app.keys = ["test"];
app.use(session({ store: store }, app));

//处理请求体数据，ctx.request.body 获取
// app.use(bodyParser());

app.use(
  formaidable({
    // 设置上传目录，否则在用户的temp目录下
    // 默认根据文件算法生成hash字符串（文件名），无后缀
    uploadDir: uploadDir,
    keepExtensions: true
  })
);

// 中间件使用列表
app.use(userRouter.routes());
app.use(musicRouter.routes());

// 处理405 方法不匹配和501 方法未实现

app.use(userRouter.allowedMethods());
