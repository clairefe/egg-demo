'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/access/index')
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/access/add')
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/access/edit')
  }
}

module.exports = AccessController;