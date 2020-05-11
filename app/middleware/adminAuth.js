const url = require('url');

module.exports = options => {
  return async function adminAuth(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer'];
    //if没有登录跳登录
    //else登录之后走下一步流程
    if(ctx.session.userInfo){
      await next()
    }else{
      //并不是所有的页面都需要走登录，给一个白名单
      const noLoginWhiteList = ['/admin/login', '/admin/verify', '/admin/doLogin']
      if(noLoginWhiteList.includes(pathname)){
        await next()
      }else{
        ctx.redirect('/admin/login')
      }
    }
  };
};