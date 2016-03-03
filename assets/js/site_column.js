/**
 * site level column module
 *
 * @author victor li
 * @date 2016/03/03
 */

'use strict';

const _column = require('./_column');

$(document).ready(function() {
    _column.fetchPosts().done(res => {
        console.log(res);
        _column.showPosts(res.rows, false);
    });
});
