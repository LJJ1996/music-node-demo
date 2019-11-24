module.exports = (rules) => {
  return async (ctx, next) => {
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (rule.regex) {
        let result = rule.regex.exec(ctx.url);
        if (result) {
          if (!rule.dist) {
            ctx.url = result[1];
          } else {
            ctx.url = rule.dist;
          }
        }
      }

      if (rule.src === ctx.url) {
        ctx.url = rule.dist;
      }
    }



    // if (ctx.url.startsWith("/public")) {
    //   ctx.url = ctx.url.replace("/public", "");
    // }
    // if (ctx.url === "/") {
    //   ctx.url = "/user/login";
    // }
    await next();
  };
};
