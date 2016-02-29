/**
 * user setting module
 *
 * @author victor li
 * @date 2016/02/20
 */

'use strict';

const APP_SETTING = require('./app_setting');
const util = require('./util');

const progressbar = $("#progressbar"),
    bar = progressbar.find('.uk-progress-bar'),
    settings = {
        action: '/api/site/upload',
        params: {bucket_name: 'avatar'},
        allow : '*.(jpg|jpeg|gif|png)',
        loadstart: function() {
            bar.css("width", "0%").text("0%");
            progressbar.removeClass("uk-hidden");
        },
        progress: function(percent) {
            percent = Math.ceil(percent);
            bar.css("width", percent+"%").text(percent+"%");
        },
        allcomplete: function(response) {
            if (response)
                response = JSON.parse(response);
            if (response.upload) {
                const userId = $('#user-id').val();
                const url = `/api/users/${userId}`;
                const fileName = response.name;
                util.ajax('POST', url, {avatar: response.name}).done(function(data) {
                    if (data) {
                        data = JSON.parse(data);
                        if (data[0]) {
                            $('#avatar-setting img').attr('src', APP_SETTING['qiniu']['avatar_url'] + '/' + fileName + '?imageView2/0/w/200/h/200');
                            UIkit.notify({
                                message: '<i class=\'uk-icon-check\'></i> 您的头像更换好了',
                                status: 'success',
                                timeout: 3000,
                                pos: 'top-center'
                            });
                        }
                    }
                }).fail(function(err) {
                    UIkit.notify({
                        message: '<i class=\'uk-icon-times\'></i> 您的头像更换出了点小问题，重新来一次吧',
                        status: 'danger',
                        timeout: 3000,
                        pos: 'top-center'
                    });
                });
            }
            bar.css("width", "100%").text("100%");
            setTimeout(function(){
                progressbar.addClass("uk-hidden");
            }, 250);
        }
    };

const select = UIkit.uploadSelect($("#actual-avatar-select"), settings);

/**
 * 激活店铺
 * @param name 店铺名称
 */
function activeShop(name) {
    const url = '/api/shop/active';
    util.ajax('POST', url, {name: name}).done(function(data) {
        console.log(data);
    }).fail(function(err) {
        console.log(err);
    });
}

/**
 * 激活专栏
 * @param name 专栏名称
 */
function activeColumn(name) {
    const url = '/api/columns/active';
    util.ajax('POST', url, {name: name}).done(function(data) {
        console.log(data);
    }).fail(function(err) {
        console.log(err);
    });
}

$('body').on('click', '#shop-setting button', function(e) {
    e.preventDefault();
}).on('click', '#avatar-select', function(e) {
    $('#actual-avatar-select').click();
}).on('click', '#avtive-shop-button', function(e) {
    e.preventDefault();
    const shopName = $('#shop-setting input').val();
    activeShop(shopName);
}).on('click', '#active-column-button', function(e) {
    e.preventDefault();
    const columnName = $('#column-setting input').val();
    activeColumn(columnName);
});
