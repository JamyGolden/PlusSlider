
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Module configs
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * Version: "<%= pkg.version %>"\n' +
            ' * <%= pkg.author %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */' +
            '\n',
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            scripts: {
                files: ['js/jquery.plusslider.js'],
                tasks: ['version', 'uglify']
            },
            scss: {
                files: ['scss/plusslider.scss', 'scss/minimal.scss'],
                tasks: ['version', 'sass']
            }
        },

        sass: {
            development: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },

        version: {
            sass_files: {
                options: {
                    prefix: 'Version\:\\s+[\'"]'
                },
                src: ['scss/plusslider.scss','scss/minimal.scss']
            },
            jquery_json: {
                options: {
                    prefix: '"version"\:\\s+[\'"]'
                },
                src: ['plusslider.jquery.json']
            },
            js_files: {
                options: {
                    prefix: 'Version\:\\s+[\'"]'
                },
                src: ['js/jquery.plusslider.js']
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
            },
            my_target: {
                files: {
                    'js/jquery.plusslider.min.js': ['js/jquery.plusslider.js']
                }
            }
        }
    });

    // Register tasks for the `grunt` terminal command
    grunt.registerTask('default', ['sass', 'uglify', 'version', 'watch']);
};
