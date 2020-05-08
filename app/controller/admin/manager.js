'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/manager/index')
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/manager/add')
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/manager/edit')
  }
}

module.exports = ManagerController;