'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/manager/index', {
      userInfo: ctx.session.userInfo
    })
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/manager/add', {
      userInfo: ctx.session.userInfo
    })
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/manager/edit', {
      userInfo: ctx.session.userInfo
    })
  }
}

module.exports = ManagerController;