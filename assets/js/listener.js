/**
 * listener module
 *
 * @author victor li
 * @date 2016/02/26
 */

'use strict';

// get location hash
function getUrlHash() {
    return window.location.hash;
};

function handlerUrlHash(hash) {
    const currentUserNick = $('#current-user').val();
    if (!currentUserNick && hash.indexOf('login') > -1) {
        const loginModal = UIkit.modal('#login-modal');
        loginModal.show();
    }
};

module.exports.loginListener = function() {
    handlerUrlHash(getUrlHash());
};

