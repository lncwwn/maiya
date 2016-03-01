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
 * 加载用户店铺信息
 */
function fetchShop(userId) {
    const url = `/api/shop/user/${userId}`;
    util.ajax('GET', url, {}).done(res => {
        if (!res) {
            // do nothing
            return;
        }
        res = JSON.parse(res);
        if (res.active) {
            $('#shop-setting input').val(res.name).prop('disabled', true);
            $('#shop-setting button').prop('disabled', true);
            $('#shop-setting-alert')
                .removeClass('uk-hidden')
                .find('.uk-alert')
                .html('<i class=\'uk-icon-check\'></i> 您的店铺已经开通了');
        }
    }).fail(err => {
        $('#shop-setting-alert')
            .removeClass('uk-hidden')
            .find('.uk-alert')
            .removeClass('uk-alert-success')
            .addClass('uk-alert-danger')
            .html('<i class=\'uk-icon-times\'></i> 服务异常，查询店铺状态失败，请您稍后重试');
    });
};

/**
 * 加载用户专栏信息
 */
function fetchColumn(userId) {
    const url = `/api/columns/user/${userId}`;
    util.ajax('GET', url, {}).done(res => {
        console.log(res);
        if (!res) {
            // do nothing
            return;
        }
        res = JSON.parse(res);
        if (res.active) {
            $('#column-setting input').val(res.name).prop('disabled', true);
            $('#column-setting button').prop('disabled', true);
            $('#column-setting-alert')
                .removeClass('uk-hidden')
                .find('.uk-alert')
                .html('<i class=\'uk-icon-check\'></i> 您的专栏已经开通了');
        }
    }).fail(err => {
        $('#column-setting-alert')
            .removeClass('uk-hidden')
            .find('.uk-alert')
            .removeClass('uk-alert-success')
            .addClass('uk-alert-danger')
            .html('<i class=\'uk-icon-times\'></i> 服务异常，查询店铺状态失败，请您稍后重试');
    });
};

/**
 * 点击左侧菜单，在右侧显示对应的面板
 * @param panelName 菜单的名称
 */
function switchMenuPanel(panelName) {
    if (!panelName) {
        return;
    }
    panelName = panelName.replace('#', '');
    $('#setting-panel>form').addClass('uk-hidden');
    $(`#${panelName}`).removeClass('uk-hidden');
};

/**
 * 根据hash匹配当前的菜单
 *
 */
function matchCurrentPanel() {
    const panelName = window.location.hash.replace('#', '');
    if (!panelName) {
        return;
    }
    $('#side-menu .menu-item').removeClass('uk-active');
    $(`#side-menu .menu-item>a[href="#${panelName}"]`).parent().addClass('uk-active');
    $(`#setting-panel>form`).addClass('uk-hidden');
    $(`#setting-panel>form#${panelName}`).removeClass('uk-hidden');
};

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

$(function() {
    const userId = $('#user-id').val();
    matchCurrentPanel();
    fetchShop(userId);
    fetchColumn(userId);
});

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
}).on('click', '#side-menu .menu-item', function(e) {
    const menuName = $(this).find('a').attr('href');
    $('#side-menu .menu-item').removeClass('uk-active');
    $(this).addClass('uk-active');
    switchMenuPanel(menuName);
});
