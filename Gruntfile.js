
module.exports = function(grunt) {
    'use strict';

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
                files: ['scss/plusslider.scss', 'scss/minimal.scss', 'js/jquery.plusslider.js'],
                tasks: ['version', 'compass', 'uglify']
            },
        },

        compass: {
            dist: {
                options: { // Target options
                    specify: 'scss/*.scss',
                    banner: '<%= banner %>',
                    relativeAssets: true,
                    cssDir: 'css',
                    sassDir: 'scss',
                    imagesDir: 'img',
                    outputStyle: 'compressed'
                }
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

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register tasks for the `grunt` terminal command
    grunt.registerTask('default', ['watch', 'compass', 'version', 'uglify']);
};
