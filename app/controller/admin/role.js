'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/role/index', {
      userInfo: ctx.session.userInfo
    })
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add', {
      userInfo: ctx.session.userInfo
    })
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/role/edit', {
      userInfo: ctx.session.userInfo
    })
  }
}

module.exports = RoleController;