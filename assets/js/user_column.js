/**
 * user level column module
 *
 * @author victor li
 * @date 2016/03/03
 */

'use strict';

const moment = require('moment');
const _column = require('./_column');

$(document).ready(function() {

    _column.fetchPosts().done(res => {
        const posts = res.rows;
        posts.forEach(post => {
            post.lastModified = moment(post.created).format('YYYY年MM月DD日');
            if (post.updated) {
                post.lastModified = moment(post.updated).format('YYYY年MM月DD日');
            }
        });
        _column.showPosts(res.rows, true);
    });

});
