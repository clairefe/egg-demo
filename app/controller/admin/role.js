'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/role/index')
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add')
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/role/edit')
  }
}

module.exports = RoleController;