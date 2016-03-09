/**
 * API definition
 *
 * @author victor li
 * @date 2016/02/05
 */

'use strict';

const url = require('url');

const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 30000;

const setting = {
    // posts
    list_posts: "/posts",
    list_posts_by_column: "/posts/column/{id}",
    get_post_by_id: "/posts/id/{id}",
    get_post_by_title: "/posts/title/{title}",
    new_post: "/posts/create",
    // users
    user_login: "/users/login",
    user_register: "/users/register",
    get_user_by_id: "/users/id/{id}",
    get_user_by_nick: "/users/nick/{nick}",
    update_user: "/users/{id}",
    // shops
    get_shop_by_user: "/shops/user/{id}",
    active_shop: "/shops/active",
    // topic
    get_topic_by_user: "/topics/user/{id}",
    // column
    get_column_by_user: "/columns/user/{id}",
    get_column_by_id: "/columns/id/{id}",
    list_columns: "/columns",
    active_column: "/columns/active",
    // goods
    list_goods: "/goods",
    list_goods_by_shop: "/goods/shop/{id}",
    get_goods_by_id: "/goods/id/{id}",
    new_goods: "/goods/new"
};

function apiPath(pathPart) {
    return url.format({
        protocol: PROTOCOL,
        hostname: HOST,
        port: PORT,
        pathname: pathPart
    });
};

module.exports = function(key) {
    for (let name in setting) {
        if (name === key) {
            return apiPath(setting[name]);
        }
    }
};
