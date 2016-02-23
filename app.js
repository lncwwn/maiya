/**
 * Application server side entry.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const render = require('./modules/render');
const APP_SETTING = require('./settings/app_setting.json');

const Router = require('koa-router');
const staticServe = require('koa-static-server');
const koaBody = require('koa-body');
const bodyParser = require('koa-body-parser');
const session = require('koa-session');
const app = require('./koa');

// api router
const ApiRouter = new Router({
    prefix: '/api'
});

// frontend router
const CommonRouter = new Router();

const siteRouter = require('./routes/siteRouter');
const siteApiRouter = require('./routes/api/siteRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const shopRouter = require('./routes/shopRouter');
const userApiRouter = require('./routes/api/userRouter');
const postApiRouter = require('./routes/api/postRouter');
const shopApiRouter = require('./routes/api/shopRouter');


app.name = 'maiya';
// for sign cookie
app.keys = ['test01', 'test02', 'test03'];

app.use(koaBody({multipart: true}));
// request body parser
app.use(bodyParser());

app.use(session({
    key: 'user_session'
}, app));

app.use(function *(next) {
    this.render = function(viewName, data) {
        data = data || {};
        data.user = this.session.user;
        return render(viewName, data);
    };
    yield next;
});

// router
app.use(ApiRouter.routes())
    .use(CommonRouter.routes())
    .use(ApiRouter.allowedMethods())
    .use(CommonRouter.allowedMethods());

siteRouter(CommonRouter);
siteApiRouter(ApiRouter);
userRouter(CommonRouter);
postRouter(CommonRouter);
shopRouter(CommonRouter);
userApiRouter(ApiRouter);
postApiRouter(ApiRouter);
shopApiRouter(ApiRouter);

app.use(staticServe({rootDir: __dirname + '/assets', rootPath: '/assets'}));
app.use(staticServe({rootDir: __dirname + '/bower_components', rootPath: '/bower_components'}));

app.on('error', error => {
    console.log(error);
    log.error('500', error);
});

const PORT = APP_SETTING.port;
app.listen(PORT);

