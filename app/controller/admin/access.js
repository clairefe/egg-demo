'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/access/index', {
      userInfo: ctx.session.userInfo
    })
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/access/add', {
      userInfo: ctx.session.userInfo
    })
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/access/edit', {
      userInfo: ctx.session.userInfo
    })
  }
}

module.exports = AccessController;