/**
 * shop api router.
 *
 * @author victor li
 * @date 2016/02/20
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

    // 开通店铺
    router.post('/posts/active', function *() {

        if (!this.session.user) {
            this.body = Boom.forbidden('this operation need user login');
            return;
        }

        const name = this.request.body.name;
        const userId = this.request.body.userId;
        const url = API_SETTING('active_shop');
        this.body = yield request.postAsync(url).then(res => {
            return res.body;
        });

    });

};