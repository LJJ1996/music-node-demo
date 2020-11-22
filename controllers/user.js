const userModel = require("../models/user");
const captchapng = require("captchapng2");
module.exports = {
  showRegister: async (ctx, next) => {
    // let users = await userModel.getUsers();
    // console.log(users);
    ctx.render("register");
  },
  /**
   * 检查用户名是否存在
   */
  checkUsername: async (ctx, next) => {
    // 处理接收请求之类的繁琐事务，唯独不CRDU
    let { username } = ctx.request.body;
    // 查询数据库中是否存在该用户名
    let users = await userModel.findUserByUsername(username);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "可以注册" };
      return;
    }
    ctx.body = { code: "002", msg: "用户名已经存在" };
  },
  /**
   * 注册
   */
  doRegister: async (ctx, next) => {
    let { username, password, email } = ctx.request.body;
    let users = await userModel.findUserByUsername(username);
    if (users.length !== 0) {
      ctx.body = { code: "002", msg: "用户名已经存在" };
      return;
    }
    try {
      // 开始注册 （异常捕获）
      let result = await userModel.registerUser(username, password, email);

      // insertId rows 判断是否插入成功
      if (result.affectedRows === 1) {
        ctx.body = { code: "001", msg: "注册用户成功" };
        return;
      }

      // 不等于1的情况会发生在id冲突，就不插入数据
      ctx.body = { code: "002", msg: result.message };
    } catch (error) {
      // 判断e的一些信息code
      ctx.throw("002");
    }
  },
  /**
   * 登录
   */
  doLogin: async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let users = await userModel.findUserByUsername(username);
    if (users.length === 0) {
      ctx.body = { code: "002", msg: "用户名或密码不存在" };
      return;
    }
    let user = users[0];
    console.log(user);
    if (user.password === password) {
      ctx.body = { code: "001", msg: "登陆成功" };
      ctx.session.user = user;
      return;
    }
    ctx.body = { code: "001", msg: "用户名或密码不存在" };
  },
  getPic: async (ctx, next) => {
    let rand = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(80, 30, rand);
    ctx.body = png.getBuffer();
  }
};
