module.exports = function(grunt) {
  var manifest = require('./src/manifest');
  var filename = manifest.name + ' v' + manifest.version + '.zip';

  grunt.initConfig({
    browserify: {
      options: {
        transform: [['babelify', { 'presets': ['es2015'] }]]
      },
      default: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'js/*.js',
          dest: 'build/'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: ['src/js/**/*.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      default: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: 'js/*.js',
          dest: 'build/'
        }]
      }
    },
    sass: {
      options: {
        sourcemap: 'none'
      },
      default: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'css/*.scss',
          dest: 'build/',
          ext: '.css'
        }]
      }
    },
    copy: {
      default: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'img/**/*',
            '*.html',
            'manifest.json'
          ],
          dest: 'build/'
        }]
      }
    },
    clean: {
      build: ['build'],
      release: ['dist']
    },
    watch: {
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['jshint', 'browserify'],
      },
      styles: {
        files: 'src/css/**/*',
        tasks: ['sass'],
      },
      static: {
        files: [
          'src/img/**/*',
          'src/*.html',
          'src/manifest.json'
        ],
        tasks: ['copy'],
      }
    },
    compress: {
      dist: {
        options: {
          archive: 'dist/' + filename
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: '**/*',
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['jshint', 'browserify', 'sass', 'copy']);
  grunt.registerTask('dist', ['clean', 'build', 'uglify', 'compress'])
  grunt.registerTask('default', ['clean', 'build', 'watch'])
};