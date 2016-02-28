/**
 * column module
 *
 * @author victor li
 * @date 2016/02/27
 */

'use strict';

const util = require('./util');

// load posts
function loadPosts() {
    const id = $('#column-id').val();
    const url = `/api/posts/column/${id}`;
    util.ajax('GET', url, {}).then(res => {
        console.log(res);
        bindPosts(res.rows);
    });
};

function bindPosts(posts) {
    const template = $($("#posts-template").html());
    let container = document.createDocumentFragment();
    posts.forEach((post, index) => {
        const _template = template.clone();
        _template.find('.title').text(post.title).attr('href', `/posts/${post.id}`);
        container.appendChild(_template[0]);
    });
    $('#posts-list').append(container);
};

$(function() {
    loadPosts();
});
