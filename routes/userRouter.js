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
const _ = require('lodash');
const APP_SETTING = require('../settings/app_setting');
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
        this.assert(this.session.user, 401, 'this operation need user login');

        const userId = this.session.user.id;
        const url = API_SETTING('get_user_by_id').replace('{id}', userId);
        this.body = yield request.getAsync(url).then(res => {
            let data = JSON.parse(res.body);
            if (data.avatar) {
                data.avatar = APP_SETTING['qiniu']['url'] + '/' + data.avatar;
            }

            return this.render('users/setting', {current_user: data});
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

    // 用户的店铺
    router.get('/users/shop', function *() {

        // 需要登录
        this.assert(this.session.user, 401, 'this operation need user login');

        const userId = this.session.user.id;
        const url = API_SETTING('get_shop_by_user').replace('{id}', userId);
        this.body = yield request.getAsync(url).then(res => {
            const _data = JSON.parse(res.body);
            let shop = {};
            if (_data.statusCode === 404) {
                shop.shop_active = false;
            } else if (_data.id || _data.name) {
                // 店铺有id和name属性
                shop.shop_active = false;
                if (_data.active) {
                    shop.shop_active = true;
                    _data.created = moment(_data.created).format('YYYY年MM月DD日');
                    if (_data.user && _data.user.avatar) {
                        _data.user.avatar = APP_SETTING['qiniu']['url'] + '/' + _data.user.avatar;
                    }
                    shop = _.extend(shop, _data);
                }
            }
            return this.render('users/shop', {shop: shop});
        });

    });

    router.get('/users/topic', function *() {

        // 需要登录
        this.assert(this.session.user, 401, 'this operation need user login');

        const userId = this.session.user.id;
        const url = API_SETTING('get_topic_by_user').replace('{id}', userId);
        this.body = yield request.getAsync(url).then(res => {
            const data = res.body;
            return this.render('/users/topic', {data: data});
        });

    });

    // 用户的专栏
    router.get('/users/column', function *() {

        this.assert(this.session.user, 401, 'this operation need user login');

        const userId = this.session.user.id;
        const url = API_SETTING('get_column_by_user').replace('{id}', userId);

        this.body = yield request.getAsync(url).then(res => {
            let column = null;
            if (res && res.body) {
                column = JSON.parse(res.body);
                if (column.active) {
                    column.lastModified = column.updated?column.updated:column.created;
                    column.lastModified = moment(column.lastModified).format('YYYY年MM月DD日');
                }
            }

            return this.render('/users/column', {column: column});
        });

    });

};
