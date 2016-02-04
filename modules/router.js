/**
 * Application router.
 *
 * @author victor li
 * @date 2016/02/01
 */

const router = require('koa-router')();
const render = require('./render');

router.get('/', function *(next) {
    this.body = yield render('list');
});

module.exports = router;

