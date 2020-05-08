'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class BaseController extends Controller {
  async success(redirectUrl) {
    const { ctx } = this;
    await ctx.render('admin/public/success', {
      redirectUrl: redirectUrl
    })
  }
  async error(redirectUrl) {
    const { ctx } = this;
    await ctx.render('admin/public/error', {
      redirectUrl: redirectUrl
    })
  }

  async verify() {
    const { ctx } = this;
    ctx.response.type = 'image/svg+xml';
    ctx.body = (await ctx.service.tools.captcha()).data
  }
}

module.exports = BaseController;