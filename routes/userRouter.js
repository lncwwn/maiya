/**
 * user frontend router.
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
const API_SETTING = require('../settings/api_setting');

module.exports = function(router) {

    // 用户登录页面
    /*router.get('/users/login', function *() {
        this.body = yield this.render('login');
    });
    */

    // 用户账户设置页面
    router.get('/users/setting', function *() {

        // 需要登录
        if (!this.session.user) {
            const referer = this.request.header.referer;
            this.body = Boom.forbidden('this operation need user login');
            this.redirect(referer);
            return;
        }

        const userId = this.session.user.id;
        const url = API_SETTING('get_user_by_id').replace('{id}', userId);
        this.body = yield request.getAsync(url).then(res => {
            return this.render('user_setting', {user: res.body});
        });

    });

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

    // 用户的上铺
    router.get('/users/shop', function *() {

        // 需要登录
        if (!this.session.user) {
            const referer = this.request.header.referer;
            this.body = Boom.forbidden('this operation need user login');
            this.redirect(referer);
            return;
        }

        const userId = this.session.user.id;
        const url = API_SETTING('get_shop_by_user').replace('{id}', userId);
        this.body = yield request.getAsync(url).then(res => {
            const shop = res.body;
            return this.render('users/shop', {shop: shop});
        });

    });

};
