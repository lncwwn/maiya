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
const bodyParser = require('koa-body-parser');
const session = require('koa-session');
const app = require('./koa');

app.name = 'maiya';
app.keys = ['test01', 'test02', 'test03'];

// request body parser
app.use(bodyParser());

// router
app.use(router.routes());
app.use(router.allowedMethods());
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

app.use(staticServe({rootDir: __dirname + '/assets', rootPath: '/assets'}));
app.use(staticServe({rootDir: __dirname + '/bower_components', rootPath: '/bower_components'}));

app.on('error', error => {
    console.log(error);
    log.error('500', error);
});

const PORT = APP_SETTING.port;
app.listen(PORT);

