/**
 * column frontend router.
 *
 * @author victor li
 * @date 2016/02/24
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

    router.get('/columns', function *() {

        const url = API_SETTING('list_columns');
        this.body = yield request.getAsync(url).then(res => {
            if (res && res.body) {
                console.log(res.body);
                return this.render('column', {columns: res.body});
            }
        }).catch(err => {
            console.log(err);
        });

    });

    router.get('/columns/:id', function *() {

        const url = API_SETTING('get_column_by_id').replace('{id}', this.params.id);
        this.body = yield request.getAsync(url).then(res => {
            if (!res || !res.body) {
                return this.redirect('/404');
            }
            const column = JSON.parse(res.body);
            column.created = moment(column.created).format('YYYY年MM月DD日');
            return this.render('column_detail', {column: column});
        });

    });

}
