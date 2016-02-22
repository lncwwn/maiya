/**
 * user setting module
 *
 * @author victor li
 * @date 2016/02/20
 */

'use strict';

// qiniu uploader
const uploader = require('./upload');

const avatarOptions = {
    browse_button: 'avatar-upload',
    uptoken_url: '/api/site/uptoken/my-avatar',
    domain: 'http://7xr4mx.com1.z0.glb.clouddn.com',
    container: 'test'
};

$('body').on('click', '#shop-setting button', function(e) {
    e.preventDefault();
});

uploader(avatarOptions);
