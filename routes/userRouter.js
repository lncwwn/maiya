/**
 * user frontend router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const md5 = require('md5');
// api setting
const API_SETTING = require('../settings/api_setting');

module.exports = function(router) {

    // 用户登录页面
    /*router.get('/users/login', function *() {
        this.body = yield this.render('login');
    });
    */

    // 退出登录
    router.get('/users/logout', function *() {

        const referer = this.request.header.referer;
        if (this.session.user) {
            this.session.user = null;
            this.cookies.set('user_session', null, {
                expires: 0
            });
        }
        this.redirect(referer);
    });

};
