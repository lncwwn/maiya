/**
 * editor module
 *
 * @author victor li
 * @date 2016/02/29
 */

'use strict';

const APP_SETTING = require('./app_setting');
const util = require('./util');

$(document).ready(function() {

    /**
     * get qiniu upload token
     *
     * @retuen gettoken ajax promise
     */
    function getQiNiuToken() {
        const bucketName = 'my-post';
        const url = `/api/site/uptoken/${bucketName}`;
        return util.ajax('GET', url, {});
    }

    /**
     * upload image to qiniu and return the cloud link
     *
     * @return upload ajax promise
     */
    function uploadToQiNiu() {
        const url = '/api/site/upload';
        return util.ajax('POST', url, {
            //
        });
    }

    const editor = $('#editor').wysiwyg({
        class: 'editor',
        toolbar: 'top-selection',
        buttons: {
            insertimage: {
                title: '插入图片',
                image: '\uf030',
                click: function($popup, $button) {
                    $('#actual-image-select').click();
                }
            },
            insertlink: {
                title: '插入链接',
                image: '\uf08e',
                click: function() {
                    //
                }
            },
            bold: {
                title: '加粗',
                image: '\uf032'
            },
            italic: {
                title: '倾斜',
                image: '\uf033',
                hotkey: 'i'
            },
            underline: {
                title: '下划线',
                image: '\uf0cd',
                hotkey: 'u'
            },
            strikethrough: {
                title: '删除线',
                image: '\uf0cc',
                hotkey: 's'
            },
            forecolor: {
                title: '字体颜色',
                image: '\uf1fc'
            },
            highlight: {
                title: '背景颜色',
                image: '\uf043'
            },
            alignleft: {
                title: '左对齐',
                image: '\uf036'
            },
            aligncenter: {
                title: '居中对齐',
                image: '\uf037',
            },
            alignright: {
                title: '右对齐',
                image: '\uf038'
            },
            alignjustify: {
                title: '两端对齐',
                image: '\uf039'
            },
            subscript: {
                title: '下标',
                image: '\uf12c',
            },
            superscript: {
                title: '上标',
                image: '\uf12b'
            },
            indent: {
                title: '缩进',
                image: '\uf03c'
            },
            outdent: {
                title: 'Outdent',
                image: '\uf03b'
            },
            orderedList: {
                title: '有序列表',
                image: '\uf0cb'
            },
            unorderedList: {
                title: '无序列表',
                image: '\uf0ca'
            },
            removeformat: {
                title: '清除格式',
                image: '\uf12d'
            }
        },
        maxImageSize: [450, 360]
    });

    const progressbar = $("#progressbar"),
        bar = progressbar.find('.uk-progress-bar'),
        settings = {
            action: '/api/site/upload',
            params: {bucket_name: 'post'},
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
                    const imageLink = APP_SETTING['qiniu']['post_url'] + '/' + fileName;
                    editor.wysiwyg('shell').insertImage(imageLink);
                    UIkit.notify({
                        message: '<i class=\'uk-icon-check\'></i> 图片已经上传到了服务器',
                        status: 'success',
                        timeout: 3000,
                        pos: 'top-center'
                    });
                } else {
                    UIkit.notify({
                        message: '<i class=\'uk-icon-check\'></i> 刚才的图片上传出了问题，请重来一次',
                        status: 'danger',
                        timeout: 3000,
                        pos: 'top-center'
                    });
                }
                bar.css("width", "100%").text("100%");
                setTimeout(function(){
                    progressbar.addClass("uk-hidden");
                }, 250);
            }
        };

    const select = UIkit.uploadSelect($("#actual-image-select"), settings);

});
