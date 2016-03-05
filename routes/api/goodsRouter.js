/**
 * goods api router.
 *
 * @author victor li
 * @date 2016/03/04
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

    // list goods
    router.get('/goods', function *() {

        const url = API_SETTING('list_goods');
        this.body = yield request.getAsync(url).then(res => {
            return res.body;
        });

    });

    // list goods by shop
    router.get('/goods/shop/:id', function *() {

        const shopId = this.params.id;
        const url = API_SETTING('list_goods_by_shop').replace('{id}', shopId);
        this.body = yield request.getAsync(url).then(res => {
            return res.body;
        });

    });

};
