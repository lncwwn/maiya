/**
 * upload module
 * 本上传模块使用qiniu
 *
 * @author victor li
 * @date 2016/02/22
 */

'use strict';

const Promise = require('bluebird');
const qiniu = require('./qiniu');
Promise.promisifyAll(qiniu.io);
const APP_SETTING = require('../settings/app_setting.json');

/**
 * 生成上传凭证
 */
module.exports.uptoken = function(bucket) {

    const putPolicy = new qiniu.rs.PutPolicy(bucket);
    // 上传凭证有效时间为3分钟
    putPolicy.expires = 3 * 60;

    return putPolicy.token();

};

/**
 * 上传文件
 */
module.exports.upload = function(uptoken, key, body) {

    const extra = new qiniu.io.PutExtra();
    return qiniu.io.putFileAsync(uptoken, key, body, extra);

};

/**
 * 删除文件
 */
module.exports.remove = function(uptoken, bucket, key) {

    const client = Promise.promisifyAll(new qiniu.rs.Client());
    return client.removeAsync(bucket, key);

}
