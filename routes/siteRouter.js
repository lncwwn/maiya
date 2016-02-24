/**
 * site frontend router.
 *
 * @author victor li
 * @date 2016/02/18
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

    // 问答
    router.get('/site/qa', function *() {
        this.body = yield this.render('qa');
    });

    // 话题
    router.get('/site/topic', function *() {
        this.body = yield this.render('topic');
    });

    // 专栏
    router.get('/site/column', function *() {
        this.body = yield this.render('column');
    });

    // 商店
    router.get('/site/shop', function *() {
        this.body = yield this.render('shop');
    });

};
