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
const Boom = require('boom');
const APP_SETTING = require('../../settings/app_setting');
// api setting
const API_SETTING = require('../../settings/api_setting');
const util = require('../../modules/util');
const upload = require('../../modules/upload');

module.exports = function(router) {

    /**
     * 获取图片验证码
     */
    router.get('/site/checkcode', function *() {
        const imgbase64 = util.checkcode();
        this.type = 'image/png';
        this.body = imgbase64;
    });

    /**
     * 获取qiniu上传凭证
     */
    router.get('/site/uptoken/:bucket', function *() {
        const bucket = this.params.bucket;
        const uptoken = upload.uptoken(bucket);
        this.body = {
            uptoken: uptoken
        };
    });

    /**
     * 上传文件到qiniu
     */
    router.post('/site/upload', function *() {

        // 要上传到的bucket类型
        const bucket_name = this.request.body.fields.bucket_name;
        if (!bucket_name) {
            this.body = Boom.badRequest('bucket name cannot be empty');
            return;
        }

        const bucket = APP_SETTING['qiniu']['bucket'][bucket_name];
        const name = bucket_name + '_' + this.session.user.nick + '_' + new Date().getTime();
        const file = this.request.body.files['files[]']['path'];

        const uptoken = upload.uptoken(bucket);
        this.body = yield upload.upload(uptoken, name, file).then(function(res) {
            return {
                upload: true,
                name: res.key
            };
        }).catch(function(err) {
            return Boom.wrap(new Error(err.error), err.code, err.error);
        });
    });

};
