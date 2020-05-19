'use strict';

const Service = require('egg').Service;
const url = require('url');

class AdminService extends Service {
  async checkAuth() {
    const { ctx } = this
    //步骤：
    //1.获取到该用户的role_id
    //2.根据role_id去对应的数据库中找到access_id
    //3.根据access_id找到菜单
    //
    const userInfo = ctx.session.userInfo
    const pathname = url.parse(ctx.request.url).pathname;
    //超级管理员都可以访问
    if(userInfo.is_super === 1){
      return true
    }
    const noLoginWhiteList = ['/admin/login', '/admin/verify', '/admin/doLogin']
    if(noLoginWhiteList.includes(pathname)){
      return true
    }
    const role_id = userInfo.role_id
    const accessResults = await ctx.model.RoleAccess.find({role_id})
    const accessLists = accessResults.map((item) => item.access_id.toString())
    //查出访问的URL对应的权限ID
    const accessItem = await ctx.model.Access.find({url: pathname})
    if(accessItem.length > 0 ){
      if(accessLists.includes(accessItem[0]._id.toString())){
        return true
      }
      return false
    }
    return false
  }
//获取用户对应的权限列表
  async getAuthList(role_id) {
    const { ctx } = this
    //获取所有的权限
    const list = await ctx.model.Access.aggregate([{
      $lookup: {
        from: 'access',
        localField: '_id',
        foreignField: 'module_id',
        as: 'items'
      }
    }, {
      $match: {
        'module_id': '0'
      }
    }, {
      $sort: {
        'sort': 1
      }
    }])
    //获取role_id对应的权限
    const roleList = await ctx.model.RoleAccess.find({'role_id': role_id})
    //对roleList的权限筛选
    let roleAccess = []
    roleList.forEach(item => {
      roleAccess.push(item.access_id.toString())
    })
    //遍历所有的数据然后对选中的数据checked
    list.forEach(item => {
      if(roleAccess.includes(item._id.toString())){
        item.checked = true
      }else{
        item.checked = false
      }
      item.items.forEach(subItem => {
        if(roleAccess.includes(subItem._id.toString())){
          subItem.checked = true
        }else{
          subItem.checked = false
        }
      })
    })
    return list
  }

}

module.exports = AdminService;