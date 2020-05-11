'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const { ctx } = this;
    const list = await ctx.model.Role.find({})
    await ctx.render('admin/role/index', {
      userInfo: ctx.session.userInfo,
      list
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
    const id = ctx.query.id
    const data = await ctx.model.Role.findOne({'_id': id})
    // { status: 1,
    //   add_time: 1589196148761,
    //   _id: 5eb93593c681572d854d8a1c,
    //   title: '市场部门',
    //   description: 'shi',
    //   __v: 0 }
    await ctx.render('admin/role/edit', {
      userInfo: ctx.session.userInfo,
      data
    })
  }

  //新增角色
  async doAdd() {
    const { ctx } = this;
    const {title, description} = ctx.request.body
    const role = new ctx.model.Role({
      title,
      description
    })
    await role.save()
    await this.success('/admin/role', '新增角色成功！')
  }


  async doEdit() {
    const { ctx } = this;
    const {title, description, _id} = ctx.request.body
    await ctx.model.Role.update({'_id': _id}, {
      title,
      description
    })
    await this.success('/admin/role', '编辑角色成功！')
  }

  async doDelete() {
    const { ctx } = this;
    const {title, description, _id} = ctx.request.body
    await ctx.model.Role.update({'_id': _id}, {
      title,
      description
    })
    await this.success('/admin/role', '编辑角色成功！')
  }

}

module.exports = RoleController;