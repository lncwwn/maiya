/**
 * modals module
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

window.jQuery = window.$ = require('jquery');

module.exports.events = function() {

    $('#login-modal').on({
        'show.uk.modal': function() {
            console.log('====');
        },
        'hide.uk.modal': function() {
            console.log('======');
        }
    });

};
