/**
 * Application router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const router = require('koa-router')();
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
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

router.post('/users/login', function *() {

    const url = API_SETTING('user_login');
    const nick = this.request.body.nick;
    const password = this.request.password;

    if (!nick || !password || password.length < 6 || password.length > 30) {
        this.body = {succ: false};
    }

    this.body = yield request.postAsync(url, {
        form: {
            nick: nick,
            password: password
        }
    }).then(res => {
        return res.body;
    });

});

router.get('/posts/edit', function *() {
    this.body = yield render('edit');
});

module.exports = router;

