/**
 * _shop module
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const util = require('./util');
const APP_SETTING = require('./app_setting');

module.exports.fetchGoods = function(shopId) {
    const url = `/api/goods/shop/${shopId}`;
    return util.ajax('GET', url, {});
};

module.exports.showGoods = function(goods) {
    if (!goods || !goods.length) {
        const tip = '<div class="uk-alert uk-alert-warning">您的店铺还没有上架商品，现在去<a href="/users/setting#goods-setting">添加一些商品</a>吧</div>';
        $('#goods-list').html(tip);
        return;
    }
    let goodsListStr = '',
        loop = goods.length % 3 === 0 ? goods.length / 3 : parseInt(goods.length / 3) + 1;

    for (let i = 0; i < loop; i++) {
        let goodsRowStr = '<div class="goods-row uk-width-1-1 uk-grid uk-grid-collapse">';
        for (let j = i * 3; j < goods.length && j < 3 * (i + 1); j++) {
            let item = goods[j];
            const photos = JSON.parse(item.photos);
            const cover = `${APP_SETTING['qiniu']['goods_url']}/${photos[0]}`;
            let goodsStr = '<div class="uk-width-1-3">'
                            + '<div class="goods-item">'
                            + `<a class="uk-thumbnail" href="/goods/detail/${item.id}">`
                            + `<img src="${cover}" alt="${item.name}">`
                            + '</a>'
                            + `<div class="uk-thumbnail-caption"><a href="/goods/detail/${item.id}">${item.name}</a></div>`
                            + '</div></div>';
            goodsRowStr += goodsStr;
        }
        goodsRowStr += '</div>';
        goodsListStr += goodsRowStr;
    }

    $('#goods-list>.uk-grid').html(goodsListStr);
};
