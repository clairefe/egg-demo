'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '角色列表';
  }
  async add() {
    const { ctx } = this;
    ctx.body = '添加角色';
  }
  async edit() {
    const { ctx } = this;
    ctx.body = '编辑角色';
  }
  async set() {
    const { ctx } = this;
    ctx.body = '设置权限';
  }
}

module.exports = RoleController;