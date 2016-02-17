/**
 * Applicatio client entryn
 *
 * @author victor li
 * @date 2015/02/01
 */

'use strict';

window.jQuery = window.$ = require('jquery');
const User = require('./login');

let timer = null;

$('body')
.on('click', '.progress-button', function(e) {
    e.preventDefault();
})
.on('input', '#login-form input[name="nick"]', function(e) {
    clearTimeout(timer);
    const val = $(this).val();
    const curr = $(this);
    if (val) {
        timer = setTimeout(function() {
            User.getByNick(val).then(function(data) {
                if (data) {
                    curr.addClass('uk-form-danger');
                } else {
                    curr.removeClass('uk-form-danger');
                }
            });
        }, 500);
    } else {
        curr.removeClass('uk-form-danger');
    }
})
// 用户登录
.on('click', '#login-button', function(e) {
    e.preventDefault();
    const nick = $('#login-form input[name="nick"]').val();
    const password = $('#login-form input[name="password"]').val();
    $(this).hide();
    $(this).next().removeClass('uk-hidden');
    User.login(nick, password).then(function(data) {
        // 登录成功
        if (data && data.nick) {
            //$('#login-modal').fadeOut();
            UIkit.notify({
                message: '<i class=\'uk-icon-check\'></i> 您已登录, 即将刷新本页面',
                status: 'success',
                timeout: 2000,
                pos: 'top-center'
            });
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        } else {
            // 登录失败
            UIkit.notify({
                message: '<i class=\'uk-icon-times\'></i> 您的登录出现问题，请重试',
                status: 'danger',
                timeout: 2000,
                pos: 'top-center'
            });
            $('#login-button').next().addClass('uk-hidden');
            $('#login-button').show();
        }
    });
})
// 用户注册
.on('click', '#register-button', function(e) {
    e.preventDefault();
    const nick = $('#register-form input[name="nick"]').val();
    const password1 = $('#register-form input[name="password1"]').val();
    const password2 = $('#register-form input[name="password2"]').val();
    const email = $('#register-form input[name="email"]').val();
    $(this).hide();
    $(this).next().removeClass('uk-hidden');
    User.register(nick, password1, password2, email).then(function(data) {
        console.log(data);
        // 注册成功
        if (data && data.nick) {
            UIkit.notify({
                message: '<i class=\'uk-icon-check\'></i> 恭喜您已完成注册, 请马上登录吧',
                status: 'success',
                timeout: 3000,
                pos: 'top-center'
            });
            setTimeout(function() {
                $('#login-link').click();
            }, 1000);
        } else {
            UIkit.notify({
                message: '<i class=\'uk-icon-times\'></i> 您的注册出现问题，请重试',
                status: 'danger',
                timeout: 3000,
                pos: 'top-center'
            });
            $('#register-button').next().addClass('uk-hidden');
            $('#register-button').show();
        }
    });
});
