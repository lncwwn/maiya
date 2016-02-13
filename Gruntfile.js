module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    'assets/dist/css/style.css': 'assets/less/style.less',
                    'assets/dist/css/index.css': 'assets/less/index.less',
                    'assets/dist/css/post.css': 'assets/less/post.less',
                    'assets/dist/css/login.css': 'assets/less/login.less',
                }
            }
        },
        watch: {
            less: {
                files: ['assets/less/*.less'],
                tasks: ['less']
            },
            /*js: {
                files: ['assets/js/*.js'],
                tasks: ['webpack']
            }*/
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
};
