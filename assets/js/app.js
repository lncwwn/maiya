/**
 * Applicatio client entryn
 *
 * @author victor li
 * @date 2015/02/01
 */

'use strict';

window.jQuery = window.$ = require('jquery');
const modal = require('./modal');
const User = require('./user');

let timer1 = null;
let timer2 = null;
let timer3 = null;
let timer4 = null;
let timer5 = null;

$('body')
.on('click', '.progress-button', function(e) {
    e.preventDefault();
})
// 监听注册时用户名输入
.on('input', '#register-form input[name="nick"]', function(e) {
    clearTimeout(timer1);
    const val = $(this).val();
    const curr = $(this);
    // 检查用户名是否可用
    if (val) {
        timer1 = setTimeout(function() {
            User.getByNick(val).then(function(data) {
                if (data) {
                    curr.addClass('uk-form-danger');
                    $('#register-form .nick-error>.uk-alert').text('该用户名已经被注册， 请直接登录或更换用户名注册');
                    $('#register-form .nick-error').removeClass('uk-hidden');
                } else {
                    curr.removeClass('uk-form-danger');
                    $('#register-form .nick-error').addClass('uk-hidden')
                }
            });
        }, 500);
    } else {
        curr.removeClass('uk-form-danger');
        $('#register-form .nick-error').addClass('uk-hidden');
    }
})
// 监听注册时密码的输入
.on('input', '#register-form input[name="password1"]', function(e) {
    clearTimeout(timer2);
    const val = $(this).val();
    const curr = $(this);
    timer2 = setTimeout(function() {
        if (!val || val.length < 6 || val.length > 18) {
            curr.addClass('uk-form-danger');
            $('#register-form .password1-error>.uk-alert').text('该输入6～18位密码');
            $('#register-form .password1-error').removeClass('uk-hidden');
        } else {
            curr.removeClass('uk-form-danger');
            $('#register-form .password1-error').addClass('uk-hidden');
        }
    }, 300);
})
// 监听注册时确认密码的输入
.on('input', '#register-form input[name="password2"]', function(e) {
    clearTimeout(timer3);
    const val = $(this).val();
    const curr = $(this);
    timer3 = setTimeout(function() {
        if (val !== $('#register-form input[name="password1"]').val()) {
            curr.addClass('uk-form-danger');
            $('#register-form .password2-error>.uk-alert').text('两次密码输入不一致，该再次输入您的6~18位密码');
            $('#register-form .password2-error').removeClass('uk-hidden');
        } else {
            curr.removeClass('uk-form-danger');
            $('#register-form .password2-error').addClass('uk-hidden');
        }
    }, 300);
})
// 监听登录时用户名输入
.on('input', '#login-form input[name="nick"]', function(e) {
    clearTimeout(timer4);
    const val = $(this).val();
    const curr = $(this);
    timer4 = setTimeout(function() {
        if (val) {
            curr.removeClass('uk-form-danger');
            $('#login-form .nick-error').addClass('uk-hidden');
        } else {
            curr.addClass('uk-form-danger');
            $('#login-form .nick-error>.uk-alert').text('请输入您的用户名');
            $('#login-form .nick-error').removeClass('uk-hidden');
        }
    }, 500);
})
// 监听登录时密码输入
.on('input', '#login-form input[name="password"]', function(e) {
    clearTimeout(timer5);
    const val = $(this).val();
    const curr = $(this);
    timer5 = setTimeout(function() {
        if (val && val.length >= 6) {
            curr.removeClass('uk-form-danger');
            $('#login-form .password-error').addClass('uk-hidden');
        } else {
            curr.addClass('uk-form-danger');
            $('#login-form .password-error>.uk-alert').text('请输入6~18位密码');
            $('#login-form .password-error').removeClass('uk-hidden');
        }
    }, 500);
})
// 用户登录
.on('click', '#login-button', function(e) {
    e.preventDefault();
    const nick = $('#login-form input[name="nick"]').val();
    const password = $('#login-form input[name="password"]').val();
    // 检查nick是否合法
    if (!nick) {
        $('#login-form input[name="nick"]').addClass('uk-form-danger');
        $('#login-form .nick-error>.uk-alert').text('请输入您的用户名');
        $('#login-form .nick-error').removeClass('uk-hidden');
        return;
    }
    // 检查密码是否合法
    if (!password || password.length < 6) {
        $('#login-form input[name="password"]').addClass('uk-form-danger');
        $('#login-form .password-error>.uk-alert').text('请输入您的密码');
        $('#login-form .password-error').removeClass('uk-hidden');
        return;
    }
    $(this).hide();
    $(this).next().removeClass('uk-hidden');
    User.login(nick, password).then(function(data) {
        // 登录成功
        if (data && data.nick) {
            //$('#login-modal').fadeOut();
            UIkit.notify({
                message: '<i class=\'uk-icon-check\'></i> 您已登录, 即将刷新本页面',
                status: 'success',
                timeout: 3000,
                pos: 'top-center'
            });
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        } else if (data.statusCode === 401) {
            // 登录失败
            UIkit.notify({
                message: '<i class=\'uk-icon-times\'></i> 用户名或密码错误',
                status: 'danger',
                timeout: 3000,
                pos: 'top-center'
            });
            $('#login-button').next().addClass('uk-hidden');
            $('#login-button').show();
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
    if (!nick) {
        $('#register-form input[name="nick"]').addClass('uk-form-danger');
        $('#register-form .nick-error>.uk-alert').text('请输入您要注册的用户名');
        $('#register-form .nick-error').removeClass('uk-hidden');
        return;
    }
    if (!password1) {
        $('#register-form input[name="password1"]').addClass('uk-form-danger');
        $('#register-form .password1-error>.uk-alert').text('请输入您要使用的密码');
        $('#register-form .password1-error').removeClass('uk-hidden');
        return;
    }
    if (!password2 || password2 !== password1) {
        $('#register-form input[name="password2"]').addClass('uk-form-danger');
        $('#register-form .password2-error>.uk-alert').text('两次密码输入不一致，该再次输入您的6~18位密码');
        $('#register-form .password2-error').removeClass('uk-hidden');
        return;
    }
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

modal.events();
