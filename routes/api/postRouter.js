/**
 * post api router.
 *
 * @author victor li
 * @date 2016/02/01
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const moment = require('moment');
const Boom = require('boom');
const md5 = require('md5');
// api setting
const API_SETTING = require('../../settings/api_setting');

module.exports = function(router) {

    // create new post
    router.post('/posts/create', function *() {
        if (!this.session.user) {
            this.body = Boom.forbidden('this operation need user login');
            return;
        }
        const url = API_SETTING('new_post');

        const title = this.request.body.title;
        const content = this.request.body.content;
        const created = new Date();
        const author = this.session.user.id;

        if (!title || !content) {
            this.body = Boom.badRequest('post title or content is empty');
            return;
        }

        this.body = yield request.postAsync({
            url: url,
            form: {
                title: title,
                content: content,
                created: created,
                author: author
            }
        }).then(res => {
            return res.body;
        });

    });

};
