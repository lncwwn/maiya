/**
 * _shop module
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const util = require('./util');

module.exports.fetchGoods = function(shopId) {
    const url = `/api/goods/shop/${shopId}`;
    return util.ajax('GET', url, {});
};

module.exports.showGoods = function(goods) {
    if (!goods || !goods.length) {
        const tip = '<div class="uk-alert uk-alert-warning">您的店铺还没有上架商品，现在去<a href="/users/setting#goods-setting">添加一些商品</a>吧</div>';
        $('#goods-list').html(tip);
    }
};
