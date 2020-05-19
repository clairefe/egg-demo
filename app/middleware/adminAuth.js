const url = require('url');

module.exports = options => {
  return async function adminAuth(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer'];
    //if没有登录跳登录
    //else登录之后走下一步流程
    if(ctx.session.userInfo){
      // const isAccess = await ctx.service.admin.checkAuth()
      const isAccess = true

      if(isAccess){
        //获取权限列表
        ctx.state.asideData = await ctx.service.admin.getAuthList(ctx.session.userInfo.role_id)
        await next()
      }else{
        ctx.body='您没有权限访问！'
      }
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