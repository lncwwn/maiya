/**
 * Applicatio client entryn
 *
 * @author victor li
 * @date 2015/02/01
 */

'use strict';

window.jQuery = window.$ = require('jquery');
const User = require('./login');

$('body').on('click', '#login-button', function(e) {
    const nick = $('#login-form input[name="nick"]').val();
    const password = $('#login-form input[name="password"]').val();
    User.login(nick, password);
}).on('click', '#register-button', function(e) {
    const nick = $('#register-form input[name="nick"]').val();
    const password1 = $('#register-form input[name="password1"]').val();
    const password2 = $('#register-form input[name="password2"]').val();
    const email = $('#register-form input[name="email"]').val();
    User.register(nick, password1, password2, email);
});
