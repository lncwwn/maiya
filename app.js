/**
 * Application server side entry.
 *
 * @author victor li
 * @date 2016/02/01
 */

const render = require('./modules/render');
const APP_SETTING = require('./settings/app_setting.json');

const Router = require('koa-router');
const staticServe = require('koa-static-server');
const bodyParser = require('koa-body-parser');
const session = require('koa-session');
const app = require('./koa');

// api router
const ApiRouter = new Router({
    prefix: '/api'
});

// frontend router
const CommonRouter = new Router();

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const userApiRouter = require('./routes/api/userRouter');
const postApiRouter = require('./routes/api/postRouter');

app.name = 'maiya';
app.keys = ['test01', 'test02', 'test03'];

// request body parser
app.use(bodyParser());

// router
app.use(ApiRouter.routes())
    .use(CommonRouter.routes())
    .use(ApiRouter.allowedMethods())
    .use(CommonRouter.allowedMethods());

userRouter(CommonRouter);
postRouter(CommonRouter);
userApiRouter(ApiRouter);
postApiRouter(ApiRouter);

app.use(session(app));

// set session
app.use(function *(next) {
    const loginUserCookie = this.cookies.get('login_user');
    if (loginUserCookie) {
        const cookieValues = loginUserCookie.split('&');
        this.session.currentUser = {
            id: cookieValues[0],
            nick: cookieValues[1]
        };
    }
    yield next;
});

app.use(function *(next) {
    this.state.hello = {'dsdsds': 'dsdsdsdsds'};
    yield next;
});

app.use(staticServe({rootDir: __dirname + '/assets', rootPath: '/assets'}));
app.use(staticServe({rootDir: __dirname + '/bower_components', rootPath: '/bower_components'}));

app.on('error', error => {
    console.log(error);
    log.error('500', error);
});

const PORT = APP_SETTING.port;
app.listen(PORT);

