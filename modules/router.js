/**
 * Application router.
 *
 * @author victor li
 * @date 2016/02/01
 */

const router = require('koa-router')();
const request = require('request');
const Promise = require('bluebird');
const render = require('./render');

const API_SETTING = require('../settings/api_setting');

router.get('/', function *() {
    console.log(API_SETTING('list_posts'));
    request(API_SETTING('list_posts'), (err, res, body) => {
        console.log(body);
    });
    this.body = yield render('list');
});

module.exports = router;

