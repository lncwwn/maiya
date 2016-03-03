/**
 * column module
 *
 * @author victor li
 * @date 2016/02/27
 */

'use strict';

const util = require('./util');

// load posts
module.exports.fetchPosts = function() {
    const id = $('#column-id').val();
    const url = `/api/posts/column/${id}`;
    return util.ajax('GET', url, {});
};

// render posts on page
module.exports.showPosts = function(posts, isCurrentUser) {
    let noContentTip = '<div class="uk-alert uk-alert-warning">该专栏下还没有文章</div>';
    if (isCurrentUser) {
        noContentTip = '<div class="uk-alert uk-alert-warning">您的专栏还没有文章，现在<a href="/posts/edit">写一篇</a>吧</div>';
    }
    if (!posts || !posts.length) {
        $('#posts-list').html(noContentTip);
        return;
    }
    const template = $($("#posts-template").html());
    let container = document.createDocumentFragment();
    posts.forEach((post, index) => {
        const _template = template.clone();
        _template.find('.title').text(post.title).attr('href', `/posts/${post.id}`);
        _template.find('.date').text(post.lastModified);
        _template.find('.star').text(post.star);
        container.appendChild(_template[0]);
    });
    $('#posts-list').append(container);
};

