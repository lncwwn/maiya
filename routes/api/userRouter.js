/**
 * user api router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const Boom = require('boom');
const moment = require('moment');
const md5 = require('md5');
// api setting
const API_SETTING = require('../../settings/api_setting');

module.exports = function(router) {

    /**
     * 获取用户信息api
     * method: GET
     * @param nick  用户昵称
     */
    router.get('/users/nick/:nick', function *() {

        let url = API_SETTING('get_user_by_nick');
        const nick = this.params.nick;
        url = url.replace('{nick}', nick);
        this.body = yield request.getAsync(url).then(res => {
            return res.body;
        });

    });

    /**
     * 用户登录api
     * method: POST
     * @param nick  用户昵称
     * @param password 用户密码
     */
    router.post('/users/login', function *() {

        const url = API_SETTING('user_login');
        // page will redirect to
        //const referer = this.request.header.referer;

        const nick = this.request.body.nick;
        const password = this.request.body.password;

        if (!nick || !password || password.length < 6 || password.length > 30) {
            this.body = Boom.badRequest('invalid nick or password');
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
                //this.cookies.set('user_session', `${user.nick}`, {
                    //httpOnly: true,
                    // cookie有效期30天
                    //expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                    //signed: true
                //});
                // set login session
                this.session.user = {
                    id: user.id,
                    nick: user.nick
                };
            }
            return user;
        });

    });

    /**
     * 用户注册api
     * method: POST
     * @param nick 用户昵称
     * @param password1 用户密码
     * @param password2 用户再次确认的密码
     */
    router.post('/users/register', function *() {

        const url = API_SETTING('user_register');
        const nick = this.request.body.nick;
        const password1 = this.request.body.password1;
        const password2 = this.request.body.password2;
        const email = this.request.body.email;

        if (!nick || !password1 || password1.length < 6 || password1.length > 18 || password1 !== password2) {
            this.body = Boom.badRequest('invalid nick or password');
            return;
        }
        this.body = yield request.postAsync({
            url: url,
            form: {
                nick: nick,
                email: email,
                password: md5(password1),
            }
        }).then(res => {
            return res.body;
        });
    });

};
