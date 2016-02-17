/**
 * util module
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

const captchapng = require('captchapng');

// 生成图片四位数字验证码
module.exports.checkcode = function() {
    const code = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000));
    code.color(0, 0, 0, 0);
    code.color(80, 80, 80, 255);
    const img = code.getBase64();
    return new Buffer(img, 'base64');
};
