/**
 * util module
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

window.jQuery = window.$ = require('jquery');

module.exports = {

    // defered ajax
    ajax: function(method, url, data) {
        const dtd = $.Deferred();
        return $.ajax({
            url: url,
            method: method || 'GET',
            data: data
        }).done(function(data) {
            return dtd.promise(data);
        }).fail(function(err) {
            return dtd.reject(err);
        });
    }

};
