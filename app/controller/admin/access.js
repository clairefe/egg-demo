'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '权限列表';
  }
  async add() {
    const { ctx } = this;
    ctx.body = '添加权限';
  }
  async edit() {
    const { ctx } = this;
    ctx.body = '编辑权限';
  }
}

module.exports = AccessController;