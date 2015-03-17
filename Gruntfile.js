'use strict';

//var files = require('./angularFiles').files;
var util = require('./lib/grunt/utils.js');
var versionInfo = require('./lib/versions/version-info');

module.exports = function(grunt) {

  //grunt plugins
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('lib/grunt');

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
          cleanTargetDir: true,
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

    write: {
      versionTXT: {file: 'build/version.txt', val: NG_VERSION.full},
      versionJSON: {file: 'build/version.json', val: JSON.stringify(NG_VERSION)}
    },

    clean: {
	  bower: ['.bower', 'bower_components'],
      tmp: ['tmp'],
      build: ['build']
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
        config: ".jscs.json"
      }
    },

    min: {
      sampleComponent: 'build/sample-component.js'
    },

    build: {
      sampleComponent: {
        dest: 'build/sample-component.js',
        src:['src/sample-component/sample-component.js']
      },
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('default', ['package']);

  grunt.registerTask('minify', ['clean', 'bower', 'build', 'minall']);

  grunt.registerTask('package', ['clean', 'bower', 'merge-conflict', 'jshint', 'jscs', 'buildall', 'minall', 'collect-errors', 'copy', 'write', 'compress']);

};
