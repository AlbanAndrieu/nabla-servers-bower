'use strict';

//var files = require('./angularFiles').files;
var util = require('./lib/grunt/utils.js');
var versionInfo = require('./lib/versions/version-info');
var path = require('path');
//var e2e = require('./test/e2e/tools');

module.exports = function(grunt) {

  //grunt plugins
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('lib/grunt');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-version-check');
  grunt.loadNpmTasks('grunt-installed-check');
  grunt.loadNpmTasks('grunt-check-dependencies');

  var NG_VERSION = versionInfo.currentVersion;
  //NG_VERSION.cdn = versionInfo.cdnVersion;
  var dist = 'bower-' + NG_VERSION.full;

  //global beforeEach
  util.init();

  var globalConfig = {
    componentName: 'myBower'
  };

  grunt.initConfig({
    NG_VERSION: NG_VERSION,

    pkg: grunt.file.readJSON('package.json'),

    globalConfig: globalConfig,
    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          install: true,
          verbose: true,
//          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {},
          copy: true
        }
      }
    },

    html2js: {
      options: {
        useStrict: true,
        singleModule: true,
        module: 'nabla-notifications.tpl.html',
        rename: function(moduleName) {
          return '/' + moduleName.replace('.html', '');
        }
      },
      main: {
        src: ['src/nabla-notifications/views/*.html'],
        dest: 'build/nabla-notifications/nabla-notifications.tpl.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/nabla-notifications/nabla-notifications.js', 'src/nabla-notifications/parts/*.js'],
        dest: 'build/nabla-notifications/nabla-notifications.js'
      }
    },

    copy: {
      nablaHeaderImg: {
        files: [{
          expand: true,
          cwd: 'src/nabla-header/img',
          src: ['*.png'],
          dest: 'build/nabla-header/img/'
        }]
      },
//      nablaNotifications: {
//        src: ['src/nabla-notifications/less/*.less'],
//        dest: 'build/nabla-notifications/less',
//        flatten: true,
//        filter: 'isFile',
//        expand: true
//      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['<%= globalConfig.componentName %>.js'],
          dest: 'build/'
        }]
      }
    },

    "merge-conflict": {
      files: [
        'src/**/*',
        'test/**/*',
        'docs/**/*',
        'css/**/*'
      ]
    },

    compress: {
      build: {
        options: {archive: 'build/' + dist + '.zip', mode: 'zip'},
        src: ['build/*', 'src/*', 'target/**', 'test/*', '.*', '*.js', '*.md', '*.json', '*.xml'],
        cwd: 'build',
        expand: true,
        dot: true,
        dest: dist + '/'
      }
    },

    shell: {
      "npm-install": {
        command: path.normalize('scripts/npm/install-dependencies.sh')
      }
//      "promises-aplus-tests": {
//        options: {
//          stdout: false,
//          stderr: true,
//          failOnError: true
//        },
//        command: path.normalize('./node_modules/.bin/promises-aplus-tests tmp/promises-aplus-adapter++.js')
//      }
    },

    write: {
      versionTXT: {file: 'build/version.txt', val: NG_VERSION.full},
      versionJSON: {file: 'build/version.json', val: JSON.stringify(NG_VERSION)}
    },

//    tests: {
//      modules: 'karma-modules.conf.js'
//    },

//    autotest: {
//      modules: 'karma-modules.conf.js'
//    },

//    protractor: {
//      normal: 'protractor-conf.js',
//      travis: 'protractor-travis-conf.js',
//      jenkins: 'protractor-jenkins-conf.js'
//    },

    clean: {
      //bower: ['.bower', 'bower_components'],
      tmp: ['tmp'],
      build: ['build'],
      docs: ['docs']
    },

    jshint: {
      options: {
        jshintrc: true
      },
      node: {
        files: { src: ['*.js', 'lib/**/*.js'] }
      },
      sampleComponent: {
        files: { src: 'src/sample-component/**/*.js' }
      }
//      nablaAuth: {
//        files: { src: 'src/nabla-auth/**/*.js' }
//      },
//      nablaHeader: {
//        files: { src: 'src/nabla-header/**/*.js' }
//      },
//      nablaNotifications: {
//        files: { src: 'src/nabla-notifications/**/*.js' }
//      }
    },

    jscs: {
//      src: ['src/**/*.js', 'test/**/*.js'],
      options: {
        config: ".jscs.json"
      },
      node: {
        files: { src: ['*.js'] }
      },
//      publish: {
//        files: { src: ['lib/**/*.js'] }
//      },
      sampleComponent: {
        files: { src: 'src/sample-component/**/*.js' }
      }
//      nablaAuth: {
//        files: { src: 'src/nabla-auth/**/*.js' }
//      },
//      nablaHeader: {
//        files: { src: 'src/nabla-header/**/*.js' }
//      },
//      nablaNotifications: {
//        files: { src: 'src/nabla-notifications/**/*.js' }
//      }
    },

    build: {
      sampleComponent: {
        dest: 'build/sample-component/sample-component.js',
        src:['src/sample-component/sample-component.js']
      },
      nablaAuth: {
        dest: 'build/nabla-auth/nabla-auth.js',
        src:['src/nabla-auth/nabla-auth.js']
      },
      nablaHeader: {
        dest: 'build/nabla-header/nabla-header.js',
        src:['src/nabla-header/nabla-header.js']
      },
      nablaNotification: {
        dest: 'build/nabla-notifications/nabla-notification.js',
        src:['src/nabla-notifications/nabla-notification.js']
      }
    },

    uglify: {
      sampleComponent: {
        files: {
          'build/sample-component/sample-component.min.js': ['build/sample-component/sample-component.js']
        }
      },
      nablaAuth: {
        files: {
          'build/nabla-auth/nabla-auth.min.js': ['build/nabla-auth/nabla-auth.js']
        }
      },
      nablaHeader: {
        files: {
          'build/nabla-header/nabla-header.min.js': ['build/nabla-header/nabla-header.js']
        }
      },
      nablaNotification: {
        files: {
          'build/nabla-notifications/nabla-notification.min.js': ['build/nabla-notifications/nabla-notification.js']
        }
      }
    },

    // Less processing
    less: {
      nablaHeader: {
        files: {
          'build/nabla-header/styles/css/nabla-header.css': ['src/nabla-header/less/nabla-header.less']
        }
      }
//      nablaNotification: {
//        files: {
//          'build/nabla-header/styles/css/nabla-notifications.css': ['src/nabla-notifications/less/nabla-notifications.less']
//        }
//      }
    },

    ngdocs: {
      options: {
        scripts: ['angular.js', '../src.js'],
        html5Mode: false
      },
      all: ['src/**/*.js']
    },

    connect: {
      options: {
        port: 8001,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729,
        html5Mode: true,
        startPage: '/api',
        title: "My Awesome Nabla Docs",
        imageLink: "http://home.nabla.mobi",
        titleLink: "/api",
        bestMatch: true,
        analytics: {
          account: 'UA-56011797-1',
          domainName: 'nabla.mobi'
        },
        discussions: {
          shortName: 'nabla',
          url: 'http://home.nabla.mobi',
          dev: false
        },
        keepalive: true
      },
//      livereload: {
//        options: {
//          open: true,
//          middleware: function (connect) {
//            return [
//              connect.static('.tmp'),
//              connect().use(
//                '/bower_components',
//                connect.static('./bower_components')
//              ),
//              connect().use(
//                '/app/styles',
//                connect.static('./app/styles')
//              ),
//              connect.static(appConfig.app)
//            ];
//          }
//        }
//    },
//      test: {
//        options: {
//          port: 9001,
//          middleware: function (connect) {
//            return [
//              connect.static('.tmp'),
//              connect.static('test'),
//              connect().use(
//                '/bower_components',
//                connect.static('./bower_components')
//              ),
//              connect.static(appConfig.app)
//            ];
//          }
//        }
//      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      },
      server: {}
    },

    karma: {
      sampleComponent: {
        configFile: 'karma-sample-component.conf.js'
      }
//      nablaAuth: {
//        configFile: 'karma-nabla-auth.conf.js'
//      },
//      nablaConfiguration: {
//        configFile: 'karma-nabla-configuration.conf.js'
//      },
//      nablaHeader: {
//        configFile: 'karma-nabla-header.conf.js',
//        //browsers: ['PhantomJS', 'Chrome'],
//        //singleRun: false,
//        //logLevel: 'DEBUG',
//        autoWatch: true
//      },
//      nablaNotifications: {
//        configFile: 'karma-nabla-notifications.conf.js',
//        //browsers: ['PhantomJS', 'Chrome'],
//        //singleRun: false,
//        //logLevel: 'DEBUG',
//        autoWatch: true
//      }
    },

    versioncheck: {
      options: {
        skip: ["semver", "npm", "lodash"],
        hideUpToDate: false
      }
    },

    checkDependencies: {
        this: {}
    },

    release: {
      options: {
        additionalFiles: ['bower.json'],
        npm: false, //default: true
        github: {
          //apiRoot: 'https://git.example.com/v3', // Default: https://github.com
          repo: '<%= pkg.repository.url %>', //put your user/repo here
          accessTokenVar: 'GITHUB_ACCESS_TOKEN', //ENVIRONMENT VARIABLE that contains GitHub Access Token
          // Or you can use username and password env variables, we discourage you to do so
          usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains GitHub username
          passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains GitHub password
        }
      }
    }
  });

  // global beforeEach task
  //if (!process.env.TRAVIS) {
  //  grunt.task.run('shell:npm-install');
  //}

  //alias tasks
  //grunt.registerTask('test', 'Run unit, docs and e2e tests with Karma', ['package','test:unit']);
  //grunt.registerTask('test', 'Run unit, docs and e2e tests with Karma', ['jshint', 'jscs', 'package','test:unit','test:promises-aplus', 'tests:docs', 'test:protractor']);
  //grunt.registerTask('test:jqlite', 'Run the unit tests with Karma' , ['tests:jqlite']);
  //grunt.registerTask('test:jquery', 'Run the jQuery unit tests with Karma', ['tests:jquery']);
  //grunt.registerTask('test:modules', 'Run the Karma module tests with Karma', ['build', 'tests:modules']);
  //grunt.registerTask('test:docs', 'Run the doc-page tests with Karma', ['package', 'tests:docs']);
  //grunt.registerTask('test:unit', 'Run unit, jQuery and Karma module tests with Karma', ['test:jqlite', 'test:jquery', 'test:modules']);
  //grunt.registerTask('test:protractor', 'Run the end to end tests with Protractor and keep a test server running in the background', ['webdriver', 'connect:testserver', 'protractor:normal']);
  //grunt.registerTask('test:travis-protractor', 'Run the end to end tests with Protractor for Travis CI builds', ['connect:testserver', 'protractor:travis']);
  //grunt.registerTask('test:ci-protractor', 'Run the end to end tests with Protractor for Jenkins CI builds', ['webdriver', 'connect:testserver', 'protractor:jenkins']);
  //grunt.registerTask('test:e2e', 'Alias for test:protractor', ['test:protractor']);
  //grunt.registerTask('test:promises-aplus',['build:promises-aplus-adapter','shell:promises-aplus-tests']);

  grunt.registerTask('prepare', [
    //'clean:bower',
    'bower'
  ]);

  grunt.registerTask('check', [
    'jshint',
    'jscs',
    'installed_check',
    'checkDependencies',
    'versioncheck'
  ]);

  grunt.registerTask('minify', ['clean', 'prepare', 'build', 'uglify']);

  grunt.registerTask('css', ['less']);

  grunt.registerTask('build', ['clean', 'prepare', 'merge-conflict', 'check', 'concat', 'buildall']);

//grunt.registerTask('unittest', ['karma:sampleComponent', 'karma:nablaAuth', 'karma:nablaConfiguration', 'karma:nablaHeader', 'karma:nablaNotifications']);
  grunt.registerTask('unit-test', ['check', 'karma:sampleComponent']);

  grunt.registerTask('package', ['build', 'uglify', 'html2js', 'collect-errors', 'copy', 'css', 'unit-test', 'write', 'compress', 'ngdocs']);
  //grunt.registerTask('ci-checks', ['merge-conflict', 'jshint', 'jscs']);

  grunt.registerTask('docs-test', ['package', 'connect']);

  grunt.registerTask('default', ['package']);

};
