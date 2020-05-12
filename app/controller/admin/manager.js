'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    const { ctx } = this;
    //管理员表和角色表关联 聚合查询

    const list = await ctx.model.Admin.aggregate([
      {
        $lookup:{
          from: "role",
          localField:"role_id",
          foreignField: "_id",
          as: "role"
        }
      }
    ])
    await ctx.render('admin/manager/index', {
      userInfo: ctx.session.userInfo,
      list
    })
  }
  async add() {
    const { ctx } = this;
    const roleResult = await ctx.model.Role.find({})
    await ctx.render('admin/manager/add', {
      userInfo: ctx.session.userInfo,
      roleResult
    })
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.model.Admin.find({'_id': id});
    const roleResult = await ctx.model.Role.find({})
    await ctx.render('admin/manager/edit', {
      userInfo: ctx.session.userInfo,
      data: data[0],
      roleResult
    })
  }
  //新增管理员
  async doAdd() {
    const { ctx } = this;
    const adminObj = ctx.request.body
    if((await ctx.model.Admin.find({'username': adminObj.username})).length > 0){
      await this.error('/admin/manager/add', '此管理员已经存在！')
    }else{
      const admin = new ctx.model.Admin(adminObj)
      admin.save()
      await this.success('/admin/manager', '新增管理员成功！')
    }
  }
  //编辑管理员
  async doEdit() {
    const { ctx } = this;
    const editObj = ctx.request.body
    await ctx.model.Admin.update({'_id': editObj._id}, editObj)
    await this.success('/admin/manager', '编辑管理员成功！')
  }
  //模糊搜索
  async doSearch() {
    const { ctx } = this;
    const {key} = ctx.request.body
    const queryKey = new RegExp(key, 'i') //模糊查询参数
    const data = await ctx.model.Admin.find().or([{ username: queryKey }]);
    //await this.success('/admin/manager', '数据查询成功！')
  }
}

module.exports = ManagerController;