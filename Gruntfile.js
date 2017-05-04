'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var serveStatic = require('serve-static'),
    modRewrite = require('connect-modrewrite');
var mountFolder = function (connect, dir) {
  return serveStatic(require('path').resolve(dir));
};

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        headerDev: '/*!\n* <%= pkg.name %>.min.js - v<%= pkg.version %>-dev-<%= grunt.template.today("yyyy-mm-dd") %>\n',
        headerRelease: '/*!\n* <%= pkg.name %>.min.js - v<%= pkg.version %>\n',
        banner: '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
                '* Licensed <%= pkg.license %>\n*/\n',
        // Task configuration
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            sources: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
        },
        uglify: {
            dev: {
                options: {
                    banner: '<%= headerDev %><%= banner %>'
                },
                src: 'src/md-breadcrumb/md-breadcrumb.directive.js',
                dest: 'sample/assets/md-breadcrumb/<%= pkg.name %>.min.js'
            },
            dist: {
                options: {
                    banner: '<%= headerRelease %><%= banner %>'
                },
                src: 'src/md-breadcrumb/md-breadcrumb.directive.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/md-breadcrumb',
                    src: ['*.css', '!*.min.css'],
                    dest: 'sample/assets/md-breadcrumb/',
                    ext: '.min.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/md-breadcrumb',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },
        rename: {
            dev: {
                files: [{
                    src: ['sample/assets/md-breadcrumb/md-breadcrumb.min.css'],
                    dest: 'sample/assets/md-breadcrumb/<%= pkg.name %>.min.css'
                }]
            },
            dist: {
                files: [{
                    src: ['dist/md-breadcrumb.min.css'],
                    dest: 'dist/<%= pkg.name %>.min.css'
                }]
            }
        },
        copy: {
            template: {
                files: [
                {
                    flatten: true,
                    expand: true,
                    src: [
                        'src/md-breadcrumb/md-breadcrumb.template.html',
                    ],
                    dest: 'sample/app/directives/md-breadcrumb'
                }
                ]
            },
            dist: {
                files: [
                {
                    flatten: true,
                    expand: true,
                    src: [
                        'src/md-breadcrumb/md-breadcrumb.template.html'
                    ],
                    dest: 'dist/directives/md-breadcrumb'
                }
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            sample: {
                options: {
                    base: 'sample'
                }
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite([
                                '!(\\..+)$ / [L]'
                            ]),
                            lrSnippet,
                            mountFolder(connect, 'sample')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            sources: {
                files: '<%= jshint.sources.src %>',
                tasks: ['jshint:sources']
            },
            sample: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                tasks: ['copy:template', 'uglify:dev', 'cssmin:dev', 'rename:dev'],
                files: [
                    'src/**/*.{js,html,css}'
                ]
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');


    grunt.registerTask('sample', ['uglify:dev', 'cssmin:dev', 'rename:dev', 'connect:livereload', 'open', 'watch']);

    grunt.registerTask('release', 'Create a new release', function (target) {
        if (!target) {
            target = 'patch';
        }

        grunt.task.run(
            'bump-only:' + target, // Version update
            'copy:dist',
            'uglify:dist',
            'cssmin:dist',
            'rename:dist',
            'bump-commit'
        );

    });
};