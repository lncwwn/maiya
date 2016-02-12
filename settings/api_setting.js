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
    list_posts: "/posts",
    get_post_by_id: "/posts/id/{id}",
    get_post_by_title: "/posts/title/{title}"
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
