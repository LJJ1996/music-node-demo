module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      // e.code === '002'
      console.log(e);
      ctx.render("error", { msg: "002状态错误，原因是:XXX" });
    }
  };
};
