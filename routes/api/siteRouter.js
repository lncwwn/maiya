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
const upload = require('../../modules/upload');

module.exports = function(router) {

    // 获取图片验证码
    router.get('/site/checkcode', function *() {
        const imgbase64 = util.checkcode();
        this.type = 'image/png';
        this.body = imgbase64;
    });

    // 获取qiniu上传凭证
    router.get('/site/uptoken/:bucket', function *() {
        const bucket = this.params.bucket;
        const uptoken = upload.uptoken(bucket);
        this.body = {
            uptoken: uptoken
        };
    });

};
