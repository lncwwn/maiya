/**
 * upload module
 * 本上传模块使用qiniu
 *
 * @author victor li
 * @date 2016/02/22
 */

'use strict';

const qiniu = require('./qiniu');
const APP_SETTING = require('../settings/app_setting.json');

// 生成上传凭证
module.exports.uptoken = function(bucket) {

    const putPolicy = new qiniu.rs.PutPolicy(bucket);
    // 上传凭证有效时间为3分钟
    putPolicy.expires = 3 * 60;

    return putPolicy.token();

};
