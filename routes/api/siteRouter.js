/**
 * common site api router.
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
// api setting
const API_SETTING = require('../../settings/api_setting');
const util = require('../../modules/util');

module.exports = function(router) {
    
    // 获取图片验证码
    router.get('/site/checkcode', function *() {
        const imgbase64 = util.checkcode();
        this.type = 'image/png';
        this.body = imgbase64;
    });

};
