'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class BaseController extends Controller {
  async success(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/success', {
      redirectUrl: redirectUrl,
      message: message || '操作成功！'
    })
  }
  
  async error(redirectUrl, message) {
    const { ctx } = this;
    await ctx.render('admin/public/error', {
      redirectUrl: redirectUrl,
      message: message || '操作失败！'
    })
  }

  async verify() {
    const { ctx } = this;
    ctx.response.type = 'image/svg+xml';
    ctx.body = (await ctx.service.tools.captcha()).data
  }
  //数据库数据删除
  async delete() {
    const { ctx } = this;
    const model = ctx.request.query.model;
    const id = ctx.request.query.id;
    await ctx.model[model].deleteOne({"_id": id})
    await ctx.redirect(ctx.state.prevPage)
  }

  async createStaticHtml(filename, viewContent) {
    const { ctx } = this;
    const target = path.join('app/dist/pages', `${filename}.html`)
    fs.writeFile(target, viewContent,function(err){
      if(err){
        console.log(err)
      }
    })
  }
  //菜单menu显示
  async renderMenu() {
    const { ctx } = this;
  }
}

module.exports = BaseController;