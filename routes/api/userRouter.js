/**
 * user api router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const md5 = require('md5');
const render = require('../../modules/render');
// api setting
const API_SETTING = require('../../settings/api_setting');

module.exports = function(router) {

    /**
     * 用户登录api
     * method: POST
     * @param nick  用户昵称
     * @param password 用户密码
     */
    router.post('/users/login', function *() {

        const url = API_SETTING('user_login');
        const nick = this.request.body.nick;
        const password = this.request.body.password;

        if (!nick || !password || password.length < 6 || password.length > 30) {
            this.body = {succ: false};
        }

        this.body = yield request.postAsync({
            url: url,
            form: {
                nick: nick,
                password: md5(password)
            }
        }).then(res => {
            const user = JSON.parse(res.body);
            // 设置登录cookie
            if (user && user.nick) {
                this.cookies.set('login_user', `${user.id}&${user.nick}`, {
                    httpOnly: true,
                    // cookie有效期30天
                    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                    signed: true
                });
            }
            return user;
        });

    });

};
