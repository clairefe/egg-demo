'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/login')
  }

  async doLogin() {
    const { ctx } = this;
    //获取表单提交的数据
    const {username, password, verify} = ctx.request.body
    //判断验证码是否正确
    const code = ctx.session.code
    //验证码正确
    if(code.toUpperCase() === verify.toUpperCase()){
      //对密码进行MD5加密，然后和数据库中的用户名和密码对照
      const md5Pwd = await ctx.service.tools.md5(password)
      //使用mongoose和moogdb数据库查询用户数据如果用户存在则登录成功，否则登录失败
      const user = await ctx.model.Admin.find({username: username, password: md5Pwd})
      if(user.length > 0){
        ctx.session.userInfo = user[0]
        await this.success('/admin/manager', '用户登录成功！')
        //用户存在，存储用户信息，并且跳转页面
      }else{
        //用户不存在
        await this.error('/admin/login', '用户名或者密码不正确！')
      }
    }else{
      //验证码不正确
      await this.error('/admin/login', '验证码错误！')
    }
  }

  async loginOut() {
    const { ctx } = this;
    ctx.session.userInfo = null;
    ctx.redirect('/admin/login')
  }
}

module.exports = LoginController;