/**
 * Application server side entry.
 *
 * @author victor li
 * @date 2016/02/01
 */

const render = require('./modules/render');
const router = require('./modules/router');
const APP_SETTING = require('./settings/app_setting.json');

const staticServe = require('koa-static-server');
const app = require('koa')();

app.use(router.routes()).use(router.allowedMethods());

app.use(staticServe({rootDir: __dirname + '/assets', rootPath: '/assets'}));
app.use(staticServe({rootDir: __dirname + '/bower_components', rootPath: '/bower_components'}));

/*
app.use(function *(next){
    yield next
    this.body = yield render('list');
});
*/

app.on('error', error => {
    log.error('500', error);
});

const PORT = APP_SETTING.port;
app.listen(PORT);

