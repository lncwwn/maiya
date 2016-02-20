/**
 * shop frontend router.
 *
 * @author victor li
 * @date 2016/02/19
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const md5 = require('md5');
const util = require('../modules/util');
// api setting
const API_SETTING = require('../settings/api_setting');

module.exports = function(router) {

    // 加载商铺列表
    router.get('/shops', function *() {
        //
    });

};
