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
        //
    });

}
