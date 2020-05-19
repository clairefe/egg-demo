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


  async auth() {
    const { ctx } = this;
    const role_id = ctx.query.id
    //获取所有的权限
    // const list = await ctx.model.Access.aggregate([{
    //   $lookup: {
    //     from: 'access',
    //     localField: '_id',
    //     foreignField: 'module_id',
    //     as: 'items'
    //   }
    // }, {
    //   $match: {
    //     'module_id': '0'
    //   }
    // }, {
    //   $sort: {
    //     'sort': 1
    //   }
    // }])
    // //获取role_id对应的权限
    // const roleList = await ctx.model.RoleAccess.find({'role_id': role_id})
    // //对roleList的权限筛选
    // let roleAccess = []
    // roleList.forEach(item => {
    //   roleAccess.push(item.access_id.toString())
    // })
    // //遍历所有的数据然后对选中的数据checked
    // list.forEach(item => {
    //   if(roleAccess.includes(item._id.toString())){
    //     item.checked = true
    //   }else{
    //     item.checked = false
    //   }
    //   item.items.forEach(subItem => {
    //     if(roleAccess.includes(subItem._id.toString())){
    //       subItem.checked = true
    //     }else{
    //       subItem.checked = false
    //     }
    //   })
    // })
    const list = await ctx.service.admin.getAuthList(role_id)
    await ctx.render('admin/role/auth', {
      userInfo: ctx.session.userInfo,
      role_id,
      list
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

  async doAuth() {
    const { ctx } = this;
    const { role_id, access_node } = ctx.request.body;
    //删除改角色对应的所有的权限
    await ctx.model.RoleAccess.deleteMany({'role_id': role_id});
    //给用户绑定权限
    access_node.forEach(item => {
      const data = new ctx.model.RoleAccess({
        role_id,
        access_id: item
      })
      data.save()
    })

    await this.success('/admin/role', '角色授权成功！')
  }
  
}

module.exports = RoleController;