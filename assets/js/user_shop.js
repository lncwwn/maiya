/**
 * user shop module.
 *
 * @author victor li
 * @date 2016/03/04
 */

'use strict';

const _shop = require('./_shop');

$(function() {
    const shopId = $('#shop-id').val();
    _shop.fetchGoods(shopId).done(res => {
        console.log(res);
    });
});

