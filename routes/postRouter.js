/**
 * post frontend router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const md5 = require('md5');
const util = require('../modules/util');
// api setting
const API_SETTING = require('../settings/api_setting');

module.exports = function(router) {

    // 加载首页，文章列表页
    router.get('/', function *() {

        this.body = yield request.getAsync(API_SETTING('list_posts')).then(res => {
            const body = JSON.parse(res.body);
            const posts = body.rows;
            for (let post of posts) {
                //post.lastModified = moment(post.lastModified).format('YYYY年MM月DD日 hh:mm:ss');
                post.lastModified = util.normalDate(post.lastModified);
            }

            return this.render('list', { posts: posts });
        }).catch(e => {
            console.log(e);
        });

    });

    // 加载文章详情页
    router.get('/posts/:id', function *() {

        let url = API_SETTING('get_post_by_id').replace('{id}', this.params.id);
        url = encodeURI(url);
        this.body = yield request.getAsync(url).then(res => {
            let body = JSON.parse(res.body);
            body.lastModified = util.normalDate(body.lastModified);
            return this.render('post', { post: body });
        }).catch(e => {
            console.log(e);
        });

    });

    // 文章编辑页面
    router.get('/posts/edit', function *() {
        this.body = yield this.render('edit');
    });

};
