/**
 * Application router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const app = require('../koa');
const router = require('koa-router')();
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const md5 = require('md5');
const render = require('./render');
// api setting
const API_SETTING = require('../settings/api_setting');

/**
 * 加载首页，文章列表页
 */
router.get('/', function *() {

    this.body = yield request.getAsync(API_SETTING('list_posts')).then(res => {
        const body = JSON.parse(res.body);
        const posts = body.rows;
        for (let post of posts) {
            post.lastModified = moment(post.lastModified).format('YYYY年MM月DD日 hh:mm:ss');
        }
        return render('list', { posts: posts });
    }).catch(e => {
        console.log(e);
    });

});

/**
 * 加载文章详情页
 */
router.get('/posts/:title', function *() {

    let url = API_SETTING('get_post_by_title').replace('{title}', this.params.title);
    url = encodeURI(url);
    this.body = yield request.getAsync(url).then(res => {
        let body = JSON.parse(res.body);
        body.lastModified = moment(body.lastModified).format('YYYY年MM月DD日 hh:mm:ss');
        return render('post', { post: body });
    }).catch(e => {
        console.log(e);
    });

});

/**
 * 用户登录页面
 */
/*router.get('/users/login', function *() {
    this.body = yield render('login');
});
*/

/**
 * 用户登录api
 * method: POST
 * @param nick  用户昵称
 * @param password 用户密码
 */
router.post('/users/login', function *() {

    const url = API_SETTING('user_login');
    const nick = this.request.body.nick;
    const password = this.request.body.password;

    if (!nick || !password || password.length < 6 || password.length > 30) {
        this.body = {succ: false};
    }

    this.body = yield request.postAsync({
        url: url,
        form: {
            nick: nick,
            password: md5(password)
        }
    }).then(res => {
        const user = JSON.parse(res.body);
        // 设置登录cookie
        if (user && user.nick) {
            this.cookies.set('login_user', `${user.id}&${user.nick}`, {
                httpOnly: true,
                // cookie有效期30天
                expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                signed: true
            });
        }
        return user;
    });

});

/**
 * 文章编辑页面
 */
router.get('/posts/edit', function *() {
    console.log(app.state);
    this.body = yield render('edit');
});

module.exports = router;

