module.exports = function(grunt) {

    "use strict";

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        // A list of files which will be syntax-checked by JSHint.
        jshint: {
            files: ['src/js/shims.js', 'src/js/firechat.js', 'src/js/firechat-ui.js'],
            options: {
                regexdash: false
            }
        },

        // Precompile templates and strip whitespace with 'processContent'.
        jst: {
            compile: {
                options: {
                    path: 'templates',
                    namespace: 'FirechatDefaultTemplates',
                    prettify: true,
                    processContent: function(src) {
                        return src.replace(/(^\s+|\s+$)/gm, '');
                    }
                },
                files: {
                    'compiled/templates.js': ['templates/*.html']
                }
            }
        },

        // Compile and minify LESS CSS for production.
        less: {
            development: {
                files: {
                    "dist/firechat.css": "src/less/styles.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "dist/firechat.min.css": "src/less/styles.less"
                }
            }
        },

        // Concatenate files in a specific order.
        concat: {
            js: {
                src: [
                    'src/js/libs/underscore-1.7.0.min.js',
                    'src/js/libs/spin.min.js',
                    'compiled/templates.js',
                    'src/js/shims.js',
                    'src/js/firechat.js',
                    'src/js/firechat-ui.js',
                    'src/js/firepano.js',
                    'src/js/sha256.js'
                ],
                dest: 'dist/firechat.js'
            }
        },

        // Minify concatenated files.
        uglify: {
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: 'dist/firechat.min.js'
            }
        },

        // Clean up temporary files.
        clean: ['compiled/'],

        // Tasks to execute upon file change when using `grunt watch`.
        watch: {
            src: {
                files: ['src/**/*.*', 'templates/**/*.*'],
                tasks: ['default']
            }
        },
        copy: {
            default: {
                files: [{
                    src: 'dist/firechat.js',
                    dest: 'website/firechat-latest.js'
                }, {
                    src: 'dist/firechat.css',
                    dest: 'website/firechat-latest.css'
                }]
            }
        }
    });

    // Load specific plugins, which have been installed and specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task operations if simply calling `grunt` without options.
    grunt.registerTask('default', ['jshint', 'jst', 'less', 'concat', 'uglify', 'clean', 'copy']);

};
