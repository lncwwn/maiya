/**
 * 用户登录、注册模块
 *
 * @auhtor victor li
 * @date 2016/02/13
 */

'use strict';

const util = require('./util');

// 用户登录
module.exports.login = function(nick, password, code) {
    const url = '/api/users/login';
    return util.ajax('POST', url, {nick: nick, password: password});
};

// 用户注册
module.exports.register = function(nick, password1, password2, email) {
    const url = '/api/users/register';
    return util.ajax('POST', url, {
        nick: nick,
        password1: password1,
        password2: password2,
        email: email
    });
};
