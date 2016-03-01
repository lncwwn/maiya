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

        const url = API_SETTING('list_columns');
        this.body = yield request.getAsync(url).then(res => {
            if (res && res.body) {
                const columnsData = JSON.parse(res.body);
                const columns = columnsData.rows;

                for (let column of columns) {
                    if (column.updated) {
                        column.lastModified = moment(column.updated).format('YYYY-MM-DD');
                    } else if (column.created) {
                        column.lastModified = moment(column.created).format('YYYY-MM-DD');
                    }
                }
                return this.render('column', {columns: columns});
            }
        }).catch(err => {
            console.log(err);
        });

    });

    // 商店
    router.get('/site/shop', function *() {
        this.body = yield this.render('shop');
    });

    // 500
    router.get('/error', function *() {
        this.body = yield this.render('500');
    });

    // 404
    router.get('/404', function *() {
        this.body = yield this.render('404');
    });

};
