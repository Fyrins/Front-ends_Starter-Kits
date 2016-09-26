module.exports = function (grunt) {
    // init jit // time
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    // configure the tasks
    grunt.initConfig({
        copy: {
            build: {
                cwd: 'views/sources',
                src: ['**', '!**/*.jade', '!**/blocks', '!**/components', '!**/mixins'],
                dest: 'views/build',
                expand: true
            },
        },

        jshint: {
            all: ['Gruntfile.js',
                    'assets/js/main.js'
                 ]
        },

        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {}
                },
                files: [{
                    expand: true,
                    cwd: 'views/sources',
                    src: ['**/*.jade',
                            '!**/blocks',
                            '!**/blocks/**',
                            '!**/blocks/**/*.jade',
                            '!**/components',
                            '!**/mixins',
                            '!**/blocks/*.jade',
                            '!**/components/*.jade',
                            '!**/mixins/*.jade'],
                    dest: 'views/build',
                    ext: '.html'
                }]
            }
        },

        prettify: {
            options: {
                indent: 4,
                indent_inner_html: true,
                preserve_newlines: true,
                condense: false
            },
            html: {
                expand: true,
                cwd: 'views/build',
                ext: '.html',
                src: ['*.html'],
                dest: 'views/build'
            },
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                }
            }
        },


        watch: {
            options: {
                livereload: true
            },
            jade: {
                files: ['views/sources/**/*.jade'],
                tasks: ['jade']
            },
            copy: {
                files: ['views/sources/**', '!views/sources/**/*.jade'],
                tasks: ['copy']
            },
            compass: {
                files: 'sass/**/*.scss',
                tasks: ['compass']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['jshint'],
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '',
                    hostname: '*'
                }
            }
        },

        bower: {
            install: {

            }
        },

        concat: {
            options: {},
            prep_js: {
                src: [
                    'bower_components/jquery/dist/jquery.js'
                ],
                dest: 'assets/js/app.js'
            },
        },

        clean: {
            build: {
                src: ['views/build']
            },
            prep: {
                src: ['assets/vendor/', 'bower_components/']
            }
        },
    });

    // load task
    grunt.loadNpmTasks('grunt-bower-task');

    // define the tasks
    grunt.registerTask('js', ['jshint']);

    grunt.registerTask(
        'slave',
        'Init project, download js and clean folder.', ['bower', 'concat:prep_js', 'clean:prep']
    );

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.', ['clean', 'jade', 'copy', 'compass', 'js', 'prettify']
    );

    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.', ['build', 'connect', 'watch']
    );
};