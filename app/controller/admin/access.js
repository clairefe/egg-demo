'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    const { ctx } = this;
    //1.在access table中找出module_id为0
    const list = await ctx.model.Access.aggregate([{
      $lookup: {
        from: 'access',
        localField: '_id',
        foreignField: 'module_id',
        as: 'items'
      }
      },
      {
      $match:{
        'module_id': '0'
      }
      },
      {
      $sort:{
        'sort': 1
      }
    }])
    await ctx.render('admin/access/index', {
      userInfo: ctx.session.userInfo,
      list
    })
  }
  async add() {
    const { ctx } = this;
    const moduleList = await ctx.model.Access.find({'module_id': '0'})
    await ctx.render('admin/access/add', {
      userInfo: ctx.session.userInfo,
      moduleList
    })
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.model.Access.find({'_id': id})
    const moduleList = await ctx.model.Access.find({'module_id': '0'})
    await ctx.render('admin/access/edit', {
      userInfo: ctx.session.userInfo,
      data: data[0],
      moduleList
    })
  }

  async doAdd() {
    const { ctx, app } = this;
    let { module_name, type, action_name, url, module_id, description, sort} = ctx.request.body
    //module_id需要转换成obkectId
    if(module_id){
      module_id = app.mongoose.Types.ObjectId(module_id)
    }
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

  async doCreateHtml() {
    const { ctx } = this;
    const list = await ctx.model.Access.aggregate([{
      $lookup: {
        from: 'access',
        localField: '_id',
        foreignField: 'module_id',
        as: 'items'
      }
      },
      {
      $match:{
        'module_id': '0'
      }
      },
      {
      $sort:{
        'sort': 1
      }
    }])
    const managerString = await ctx.renderView('admin/access/index', {
      userInfo: ctx.session.userInfo,
      list
    })
    await this.createStaticHtml('access', managerString)
    await this.success('/admin/access', '页面下载完成！')
  }
}

module.exports = AccessController;