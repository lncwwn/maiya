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
    console.log(goods);
};
