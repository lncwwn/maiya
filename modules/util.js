/**
 * util module
 *
 * @author victor li
 * @date 2016/02/17
 */

'use strict';

const captchapng = require('captchapng');
const moment = require('moment');

// 生成图片四位数字验证码
module.exports.checkcode = function() {
    const code = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000));
    code.color(0, 0, 0, 0);
    code.color(80, 80, 80, 255);
    const img = code.getBase64();
    return new Buffer(img, 'base64');
};

// 格式化日期
module.exports.normalDate = function(date) {
    const dateStr = moment.utc(date).format('YYYY/MM/DD hh:mm:ss');
    const millSeconds = new Date(dateStr).getTime();
    const nowMillSeconds = new Date().getTime();
    const seconds = (nowMillSeconds - millSeconds) / 1000;
    if (seconds > 0) {
        if (seconds < 60) {
            return '刚刚';
        }
        const minutes = seconds / 60;
        if (minutes < 60) {
            return `${minutes.toFixed(0)}分钟之内`;
        }
        const hours = seconds / 60 / 60;
        if (hours < 24) {
            return `${hours.toFixed(0)}小时之内`;
        }
        const days = seconds / 60 / 60 / 24;
        if (days < 30) {
            return `${days.toFixed(0)}天之内`;
        }
        const months = seconds / 60 / 60 / 24 / 30;
        if (months < 12) {
            return `${months.toFixed(0)}个月之内`;
        }
        const years = seconds / 60 / 60 / 24 / 30 / 12;
        return `${years.toFixed(0)}年之内`;
    }
    return '刚刚';
};
