/**
 * upload module
 *
 * @author victor li
 * @date 2016/02/22
 */

'use strict';

const lodash = require('lodash');

// default upload options
let _options = {
    runtimes: 'html5, html4',
    browse_button: 'upload',
    uptoken_url: '/api/site/uptoken',
    domain: 'http://qiniu-plupload.qiniudn.com/',
    get_new_uptoken: false,
    container: 'upload-container',
    max_file_size: '1mb',
    max_retries: 3,
    dragdrop: false,
    auto_start: true,
    init: {
        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                //
            });
        },
        BeforeUpload: function(up, file) {
            //
        },
        UploadProgress: function(up, file) {
            //
        },
        FileUploaded: function(up, file, info) {
            // 每个文件上传成功后,处理相关的事情
            // 其中 info 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

            // var domain = up.getOption('domain');
            // var res = parseJSON(info);
            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
        },
        Error: function(up, err, errTip) {
            console.log(err);
        },
        UploadComplete: function() {
            //队列文件处理完毕后,处理相关的事情
        },
    }
};

module.exports = function(ops) {
    console.log(_.extend(_options, ops));
    return Qiniu.uploader(_.extend(_options, ops));
};
