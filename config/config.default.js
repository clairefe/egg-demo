/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588850941751_3517';

  //session setting
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true //延长会话周期
  }
  // add your middleware config here
  config.middleware = ["adminAuth"];

  config.adminAuth = {
    match: '/admin'
  }
  //多模板引擎配置
  config.view = {
    mapping: {
      '.html': 'ejs'
    }
  };

  config.mongoose = {
    options: {},
  };
  // // add your user config here
  // const userConfig = {
  //   // myAppName: 'egg',
  // };

  return config;
};

