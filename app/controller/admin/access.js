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

  async doAdd() {
    const { ctx } = this;
    const { module_name, type, action_name, url, module_id, description, sort} = ctx.request.body
    const access = new ctx.model.Access({
      module_name, type, action_name, url, module_id, description, sort
    })
    access.save()
    await this.success('/admin/access', '新增权限成功！')
  }

  async doEdit() {
    const { ctx } = this;
    const { _id } = ctx.request.body
    await ctx.model.Access.updateOne({'_id': _id}, ctx.request.body)
    await this.success('/admin/access', '编辑权限成功！')
  }
}

module.exports = AccessController;