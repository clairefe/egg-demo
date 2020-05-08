'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
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
    ctx.body = '编辑用户';
  }
  async set() {
    const { ctx } = this;
    ctx.body = '设置角色';
  }
}

module.exports = ManagerController;