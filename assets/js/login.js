/**
 * 用户登录、注册模块
 *
 * @auhtor victor li
 * @date 2016/02/13
 */

'use strict';

module.exports = {
    // 用户登录
    login: function(nick, password, code) {
        const url = '/api/users/login';
        $.post(url, {nick: nick, password: password}, function(data) {
            console.log(data);
        });
    },
    // 用户注册
    register: function(nick, password1, password2, email) {
        const url = '/api/users/register';
        $.post(url, {
            nick: nick,
            password1: password1,
            password2: password2,
            email: email}, function(data) {
            console.log(data);
        });
    }
};
