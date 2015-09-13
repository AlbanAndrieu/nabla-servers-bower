// Generated on 2015-05-18 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
	bower: 'grunt-bower-task',
	versioncheck: 'grunt-version-check',
	//configureProxies: 'grunt-connect-proxy',
	//'zap_start': 'grunt-zaproxy',
	//'zap_spider': 'grunt-zaproxy',
	//'zap_scan': 'grunt-zaproxy',
	//'zap_alert': 'grunt-zaproxy',
	//'zap_report': 'grunt-zaproxy',
	//'zap_stop': 'grunt-zaproxy',
	//'zap_results': 'grunt-zaproxy',
    useminPrepare: 'grunt-usemin',
	gitclone: 'grunt-git',
	gitadd: 'grunt-git',
	gitcommit: 'grunt-git',
	gittag: 'grunt-git',
	gitpush: 'grunt-git',
    //ngtemplates: 'grunt-angular-templates',
    //cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner'
    //buildcontrol: 'grunt-build-control'
  });

  var TAG_PREFIX = '';
  if (typeof process.env.MVN_RELEASE_VERSION === 'undefined') {
    TAG_PREFIX = 'v';
  }

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,
    pkg: grunt.file.readJSON('package.json'),

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            'bower_repo'
          ]
        }]
      },
      bower_repo: {
        files: [{
          dot: true,
          src: [
            'bower_repo/*', '!bower_repo/.git'
          ]
        }]
      },
      server: '.tmp'
    },

    // Install bower dependencies
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['<%= config.app %>/styles/less/{,*/}*.less'],
        tasks: ['less']
      },
      compass: {
        files: ['<%= config.app %>/styles/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    less: {
      development: {
        options: {
          compress: true,
          paths: ['styles/less/*/']
        },
        files: {
          '<%= config.app %>/styles/css/nabla-theme.css': '<%= config.app %>/styles/less/nabla-theme.less',
          '<%= config.app %>/styles/css/nabla-bootstrap.css': '<%= config.app %>/styles/less/nabla-bootstrap.less'
        }
      }
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/css/bootstrap.css']
      },
      sass: {
        src: ['<%= config.app %>/styles/sass/{,*/}*.{scss,sass}']
        //ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= config.app %>/styles/sass',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= config.app %>/images',
        javascriptsDir: '<%= config.app %>/scripts',
        fontsDir: '<%= config.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= config.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= config.app %>/**/*.html',
            '<%= config.app %>/**/*.json',
            '<%= config.app %>/styles/**/*.css',
            '<%= config.app %>/scripts/**/*.js',
            '<%= config.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '.tmp/**/*.{css,js}'
          ]
        }
      },
      options: {
        watchTask: true,
        online: false,
        //browser: ["google chrome", "firefox"],
        //server: '<%= config.app %>'
        proxy: 'localhost:8001'
        //proxy: SERVER_HOST + ":" + SERVER_PORT
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      //options: {
      //  encoding: 'utf8',
      //  algorithm: 'md5',
      //  length: 20
      //},
      dist: {
        src: [
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css',
          '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= config.dist %>/images/no-filerev/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          //'<%= config.dist %>/*.{ico,png}',
          '<%= config.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= config.app %>/**/*.html',
      //html: '<%= config.app %>/index.html',
      options: {
        dest: '<%= config.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              //js: ['concat', 'uglifyjs'] //when using uncss
              // Disabled as we'll be using a manual
              // cssmin configuration later. This is
              // to ensure we work well with grunt-uncss
              css: ['cssmin'] //disable when using uncss
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      //js: ['<%= config.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts/scripts.js': [
            '<%= config.dist %>/scripts/scripts.js'
          ],
          '<%= config.dist %>/scripts/vendor.js': [
            '<%= config.dist %>/scripts/vendor.js'
          ]
        }
      }
    },
    // concat: {
    //   dist: {}
    // },

    'compare_size': {
      files: [
        'app/styles/**',
        'dist/styles/**'
      ]
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/styles/',
          dest: '<%= config.dist %>',
          src: [
            'fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/styles/',
          src: 'css/*',
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/font-awesome/fonts/',
          src: '**/*',
          dest: '<%= config.dist %>/fonts'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      bower_repo: {
        files: [{
          expand: true,
          //cwd: '<%= config.app %>',
          src: [
            '<%= config.app %>/styles/sass/*.scss',
            '<%= config.app %>/styles/less/*.less',
            '<%= config.app %>/images/*.svg',
            '*.json'
          ],
          dest: 'bower_repo'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        //'copy:styles'
        'compass:server'
      ],
      test: [
        //'copy:styles'
        'compass'
      ],
      dist: [
        //'copy:styles',
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        prereleaseName: 'build',
        commit: false,
        createTag: false,
        push: false
      }
    },

    gitclone: {
      dist: {
        options: {
          repository: 'https://github.com/AlbanAndrieu/nabla-bower-nabla-styles.git',
          directory: 'bower_repo'
        }
      }
    },

    gitadd: {
      dist: {
        options: {
          cwd: 'bower_repo',
          all: true
        }
      }
    },

    gitcommit: {
      dist: {
        options: {
          cwd: 'bower_repo',
          message: 'Release ' + TAG_PREFIX + '<%= pkg.version %>'
        }
      }
    },

    gittag: {
      dist: {
        options: {
          cwd: 'bower_repo',
          tag: TAG_PREFIX + '<%= pkg.version %>'
        }
      }
    },

    gitpush: {
      dist: {
        options: {
          cwd: 'bower_repo',
          branch: 'master',
          tags: true
        }
      }
    },

    jscs: {
      options: {
        config: ".jscs.json"
      },
      node: {
        files: { src: ['*.js'] }
      }
    }

  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower:install',
      //'less',
      'wiredep',
      'concurrent:server',
      'copy:styles',
      //'uncss',
      'postcss',
      //'configureProxies:server',
      'connect:livereload',
      'browserSync',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'copy:styles',
        'postcss'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'bower:install',
    //'wiredep:app', //remove boostrap after the test
    'wiredep',
    //'ngconstant:prod',
    //'useminPrepare',
    'concurrent:dist',
    'postcss',
    //'uncss',
    //'ngtemplates',
    //'concat',
    'copy:dist',
    //'cdnify',
    //'cssmin',
    //'replace:debugMode',
    //'replace:versionTag',
    //'ngAnnotate',
    //'uglify',
    //'filerev',
    'usemin'
    //'critical',
    //'htmlmin',
    //'usebanner'
  ]);

  grunt.registerTask('publish', function(releaseType) {
    grunt.task.run([
      //'bump:' + releaseType,
      'deploy'
    ]);
  });

  grunt.registerTask('deploy', function(arg) {
    grunt.task.run([
      'gitclone',
      'clean:bower_repo',
      'copy:bower_repo',
      'gitadd',
      'gitcommit',
      'gittag',
      'gitpush'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    //'test',
    'build'
  ]);
};
