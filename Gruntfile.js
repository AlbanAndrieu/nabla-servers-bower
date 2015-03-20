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

  var NG_VERSION = versionInfo.currentVersion;
  //NG_VERSION.cdn = versionInfo.cdnVersion;
  var dist = 'bower-'+ NG_VERSION.full;

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

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'sample-component/src/',
          src: '<%= globalConfig.componentName %>.js',
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
        options: {archive: 'build/' + dist +'.zip', mode: 'zip'},
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
      },

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
	  bower: ['.bower', 'bower_components'],
      tmp: ['tmp'],
      build: ['build'],
      docs: ['docs']
    },

    jshint: {
      options: {
        jshintrc: true,
      },
      node: {
        files: { src: ['*.js', 'lib/**/*.js'] },
      },
      sampleComponent: {
        files: { src: 'src/sample-component/**/*.js' },
      },
//      tests: {
//        files: { src: 'test/**/*.js' },
//      },
    },

    jscs: {
      src: ['src/**/*.js', 'test/**/*.js'],
      options: {
        config: '.jscs.json'
      }
    },

    uglify: {
      sampleComponent: {
        files: {
          'build/sample-component.min.js': ['build/sample-component.js']
        }
      }
    },

    build: {
      sampleComponent: {
        dest: 'build/sample-component.js',
        src:['src/sample-component/sample-component.js']
      },
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
//	  },
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
      unit: {
        configFile: 'karma.conf.js'
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

  grunt.registerTask('minify', ['clean', 'bower', 'build', 'uglify']);

  grunt.registerTask('build', ['clean', 'bower', 'merge-conflict', 'jshint', 'jscs', 'buildall', 'karma:unit']);

  grunt.registerTask('package', ['build', 'uglify', 'collect-errors', 'copy', 'write', 'compress', 'ngdocs']);
  //grunt.registerTask('ci-checks', ['merge-conflict', 'jshint', 'jscs']);

  grunt.registerTask('docs', ['package', 'connect']);

  grunt.registerTask('default', ['package']);

};
