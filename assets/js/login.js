/**
 * 用户登录、注册模块
 *
 * @auhtor victor li
 * @date 2016/02/13
 */

'use strict';

module.exports = {
    login: function(nick, password, code) {
        const url = '/users/login';
        $.post(url, {nick: nick, password: password}, function(data) {
            console.log(data);
        });
    },
    register: function(nick, password) {
        //
    }
};
