/**
 * user setting module
 *
 * @author victor li
 * @date 2016/02/20
 */

'use strict';

const progressbar = $("#progressbar"),
    bar = progressbar.find('.uk-progress-bar'),
    settings = {
        action: '/api/site/upload',
        allow : '*.(jpg|jpeg|gif|png)', // allow only images
        loadstart: function() {
            bar.css("width", "0%").text("0%");
            progressbar.removeClass("uk-hidden");
        },
        progress: function(percent) {
            percent = Math.ceil(percent);
            bar.css("width", percent+"%").text(percent+"%");
        },
        allcomplete: function(response) {
            bar.css("width", "100%").text("100%");
            setTimeout(function(){
                progressbar.addClass("uk-hidden");
            }, 250);
        }
    };

const select = UIkit.uploadSelect($("#actual-avatar-select"), settings);

$('body').on('click', '#shop-setting button', function(e) {
    e.preventDefault();
}).on('click', '#avatar-select', function(e) {
    $('#actual-avatar-select').click();
}).on('click', '#avatar-upload', function(e) {
    //
});
