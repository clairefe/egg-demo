'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.security = {
  csrf: {
    // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
    ignore: ctx => {
      if (ctx.request.url == '/alipay/alipayNotify' || ctx.request.url == '/weixinpay/weixinpayNotify') {
        return true;
      }
      return false;
    }
  }
};
