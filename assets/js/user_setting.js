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
    bar = progressbar.find('.uk-progress-bar');

// 上传头像设置
let avatarSettings = {
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
                        $('#avatar-setting img').attr('src', `${APP_SETTING['qiniu']['avatar_url']}/${fileName}?imageView2/0/w/200/h/200`);
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

// 上传商品图片设置
let goodsImageSettings = {
    action: '/api/site/upload',
    params: {bucket_name: 'goods'},
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
            const fileName = response.name;
            appendPhoto(fileName);
            let goodsPhotos = localStorage.getItem('goods-photos');
            if (goodsPhotos) {
                goodsPhotos = JSON.parse(goodsPhotos);
            } else {
                goodsPhotos = [];
            }
            goodsPhotos.push(fileName);
            limitPhotosCount(goodsPhotos.length);
            localStorage.setItem('goods-photos', JSON.stringify(goodsPhotos));
        }
        bar.css("width", "100%").text("100%");
        setTimeout(function(){
            progressbar.addClass("uk-hidden");
        }, 250);
    }
};

const select = UIkit.uploadSelect($("#actual-avatar-select"), avatarSettings);
const goodsImageSelect = UIkit.uploadSelect($("#actual-goods-image-upload"), goodsImageSettings);

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
            $('body').append(`<input id="shop-id" type="hidden" value="${res.id}">`);
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
            $('body').append(`<input id="column-id" type="hidden" value="${res.id}">`);
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
 * 从本地缓存中加载未上传的商品照片
 */
function loadGoodsPhotosFromLocalStorage() {
    let photos = localStorage.getItem('goods-photos');
    if (photos) {
        photos = JSON.parse(photos);
        initPreviewArea();
        let photosPreviewStr = '';
        for (let photo of photos) {
            appendPhoto(photo);
        }
        $('#goods-image-preview').removeClass('uk-hidden');
        limitPhotosCount(photos.length);
    }
};

function initPreviewArea() {
    $('#goods-image-preview').html('<div class="uk-grid" data-uk-grid-margin></div>');
};

function appendPhoto(photo) {
    let photosPreviewStr = '<div class="uk-width-1-2 preview-item">'
                            + '<div class="uk-thumbnail">'
                            + `<img src="${APP_SETTING['qiniu']['goods_url']}/${photo}" />`
                            + '<div class="uk-thumbnail-caption">'
                            + `<a href="javascript:;" class="delete-photo" id="${photo}"><i class="uk-icon-trash"></i> 删除</a>`
                            + '</div></div></div>';
    $('#goods-image-preview>.uk-grid').append($(photosPreviewStr));
};

function limitPhotosCount(count) {
    if (count >= 3) {
        $('#upload-goods-img').addClass('uk-hidden');
    }
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
};

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
};

/**
 * 从服务器删除商品照片
 */
function deleteGoodsPhoto(fileName) {
    const bucketName = 'goods';
    util.ajax('POST', '/api/site/file', {bucket_name: bucketName, file_name: fileName}).done(function(data) {
        if (data && data.removed) {
            $(`#${fileName}`).closest('.preview-item').remove();
            deleteGoodsPhotoFromLocalStorage(fileName);
            $('#upload-goods-img').removeClass('uk-hidden');
        }
    }).fail(function(err) {
        console.log(err);
    });
};

/**
 * 从本地删除商品照片记录
 */
function deleteGoodsPhotoFromLocalStorage(fileName) {
    let photos = localStorage.getItem('goods-photos');
    if (photos) {
        photos = JSON.parse(photos);
        const index = photos.indexOf(fileName);
        photos.splice(index, 1);
        localStorage.setItem('goods-photos', JSON.stringify(photos));
    }
};

/**
 * 添加商品
 */
function addGoods() {
    const name = $.trim($('#goods-setting input[name="goods_name"]').val());
    const price = $.trim($('#goods-setting input[name="goods_price"]').val());
    const inventory = $.trim($('#goods-setting input[name="goods_inventory"]').val());
    const description = $.trim($('#goods-setting textarea[name="goods_des"]').val());
    const photos = localStorage.getItem('goods-photos');
    const shop = $('#shop-id').val();
    const params = {
        name: name,
        price: price,
        inventory: inventory,
        description: description,
        photos: photos,
        shop: shop
    };
    if (validateGoodsParams(params)) {
        const url = '/api/goods/add';
        util.ajax('POST', url, {
            name: name,
            price: price,
            inventory: inventory,
            description: description,
            photos: photos,
            shop: shop
        }).done(function(res) {
            console.log(res);
        }).fail(function(err) {
            console.log(err);
        });
    }
};

/**
 * 验证商品参数信息
 */
function validateGoodsParams(params) {
    if (!params.name) {
        $('#goods-setting .name-error').html('<i class="uk-icon-exclamation"></i> 请填写商品名称').removeClass('uk-hidden');
        return;
    } else {
        $('#goods-setting .name-error').addClass('uk-hidden');
    }
    if (params.price == '' || params.price < 0 || isNaN(+params.price)) {
        $('#goods-setting .price-error').html('<i class="uk-icon-exclamation"></i> 请填写正确的商品价格，价格为大于等于0的数字').removeClass('uk-hidden');
        return;
    } else {
        $('#goods-setting .price-error').addClass('uk-hidden');
    }
    if (params.inventory == '' || params.inventory < 0 || isNaN(+params.inventory)) {
        $('#goods-setting .inventory-error').html('<i class="uk-icon-exclamation"></i> 请填写正确的商品库存，库存量为大于等于0的整数').removeClass('uk-hidden');
        return;
    } else {
        $('#goods-setting .inventory-error').addClass('uk-hidden');
    }
    if (!params.description) {
        $('#goods-setting .description-error').html('<i class="uk-icon-exclamation"></i> 请填写商品描述，做用心负责的卖家').removeClass('uk-hidden');
        return;
    } else {
        $('#goods-setting .description-error').addClass('uk-hidden');
    }
    if (!params.photos) {
        $('#goods-setting .photos-error').html('<i class="uk-icon-exclamation"></i> 请务必上传三张商品照片').removeClass('uk-hidden');
        return;
    } else {
        const photos = JSON.parse(params.photos);
        if (photos.length < 3) {
            const missing = 3 - photos.length;
            $('#goods-setting .photos-error').html(`<i class="uk-icon-exclamation"></i> 请务必上传三张商品照片，您还需要上传${missing}张`).removeClass('uk-hidden');
            return;
        } else {
            $('#goods-setting .photos-error').addClass('uk-hidden');
        }
    }
    return true;
};

// on document ready
$(function() {
    const userId = $('#user-id').val();
    matchCurrentPanel();
    fetchShop(userId);
    fetchColumn(userId);
    loadGoodsPhotosFromLocalStorage();
});

let timer1, timer2, timer3, timer4, timer5;

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
}).on('click', '#upload-goods-img', function(e) {
    $('#actual-goods-image-upload').click();
}).on('click', '#goods-image-preview .delete-photo', function(e) {
    const id = $(this).attr('id');
    deleteGoodsPhoto(id);
}).on('click', '#add-goods-button', function(e) {
    e.preventDefault();
    addGoods();
}).on('input', '#goods-setting input[name="goods_name"]', function(e) {
    clearTimeout(timer1);
    const value = $(this).val();
    timer1 = setTimeout(function() {
        if (value) {
            $('#goods-setting .name-error').addClass('uk-hidden');
        } else {
            $('#goods-setting .name-error').html('<i class="uk-icon-exclamation"></i> 请填写商品名称').removeClass('uk-hidden');
        }
    }, 500);
}).on('input', '#goods-setting input[name="goods_price"]', function(e) {
    clearTimeout(timer2);
    const value = $(this).val();
    timer2 = setTimeout(function() {
        if (value && !isNaN(+value) && value >= 0) {
            $('#goods-setting .price-error').addClass('uk-hidden');
        } else {
            $('#goods-setting .price-error').html('<i class="uk-icon-exclamation"></i> 请填写正确的商品价格，价格为大于等于0的数字').removeClass('uk-hidden');
        }
    }, 500);
}).on('input', '#goods-setting input[name="goods_inventory"]', function(e) {
    clearTimeout(timer3);
    const value = $(this).val();
    timer3 = setTimeout(function() {
        if (value && !isNaN(+value) && value >= 0) {
            $('#goods-setting .inventory-error').addClass('uk-hidden');
        } else {
            $('#goods-setting .inventory-error').html('<i class="uk-icon-exclamation"></i> 请填写正确的商品库存，库存量为大于等于0的整数').removeClass('uk-hidden');
        }
    }, 500);
}).on('input', '#goods-setting textarea[name="goods_des"]', function(e) {
    clearTimeout(timer4);
    const value = $(this).val();
    timer4 = setTimeout(function() {
        if (value) {
            $('#goods-setting .description-error').addClass('uk-hidden');
        } else {
            $('#goods-setting .description-error').html('<i class="uk-icon-exclamation"></i> 请填写商品描述，做用心负责的卖家').removeClass('uk-hidden');
        }
    }, 500);
});
