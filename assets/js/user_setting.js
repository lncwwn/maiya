/**
 * user setting module
 *
 * @author victor li
 * @date 2016/02/20
 */

'use strict';

module.exports.events = function() {
    $('body').on('click', '#shop-setting button', function(e) {
        e.preventDefault();
        alert();
    });
};
