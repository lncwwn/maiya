/**
 * column module
 *
 * @author victor li
 * @date 2016/02/27
 */

'use strict';

const util = require('./util');

// load posts
function fetchPosts() {
    const id = $('#column-id').val();
    const url = `/api/posts/column/${id}`;
    util.ajax('GET', url, {}).then(res => {
        console.log(res);
        showPosts(res.rows);
    });
};

function showPosts(posts) {
    if (!posts || !posts.length) {
        $('#posts-list').html('<div class="uk-alert uk-alert-warning">您的专栏还没有文章，现在<a href="/posts/edit">写一篇</a>吧</div>');
        return;
    }
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
    fetchPosts();
});
