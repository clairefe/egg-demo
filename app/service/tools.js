'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');

class ToolsController extends Controller {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      width: 100,
      height: 34,
      size: 5, // size of random string
      background: '#cc9966' // background color of the svg image
    });
    ctx.session.code = captcha.text; //验证码返回的文字
    return captcha
  }
  async md5(str) {
    return md5(str)
  }
}

module.exports = ToolsController;