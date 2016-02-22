/**
 * qiniu module
 *
 * @author victor li
 * @date 2016/02/22
 */

'use strict';

const qiniu = require('qiniu');
const APP_SETTING = require('../settings/app_setting.json');

qiniu.conf.ACCESS_KEY = APP_SETTING['qiniu']['access_key'];
qiniu.conf.SECRET_KEY = APP_SETTING['qiniu']['secret_key'];

module.exports = qiniu;
