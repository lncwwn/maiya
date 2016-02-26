/**
 * column api router.
 *
 * @author victor li
 * @date 2016/02/25
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const Boom = require('boom');
const md5 = require('md5');
// api setting
const API_SETTING = require('../../settings/api_setting');

module.exports = function(router) {

    // 查看用户店铺信息
    router.get('/columns/user/:id', function() {
        //
    });

    // 开通店铺
    router.post('/columns/active', function *() {

        if (!this.session.user) {
            this.body = Boom.forbidden('this operation need user login');
            return;
        }

        const name = this.request.body.name;

        const url = API_SETTING('active_column');
        this.body = yield request.postAsync({
            url: url,
            form: {
                user_id: this.session.user.id,
                name: name
            }
        }).then(res => {
            return res.body;
        });

    });

};