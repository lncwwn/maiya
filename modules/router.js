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

    const url = API_SETTING('get_post_by_title').replace('{title}', this.params.title);
    this.body = yield request.getAsync(url).then(res => {
        const body = JSON.parse(res.body);
        return render('post', { post: body });
    }).catch(e => {
        console.log(e);
    });

});

/**
 * 用户登录页面
 */
router.get('/users/login', function *() {
    this.body = yield render('login');
});

module.exports = router;

