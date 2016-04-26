// - -------------------------------------------------------------------- - //

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jscs: {
      src: './lib/components/*.jsx',
      options: {
        config: '.jscsrc',
        esnext: true,
        fix: true
      }
    },

    babel: {
      development: {
        options: {
          presets: ['es2015', 'react']
        },
        files: [{
          src: ['./dist/uimmutable.jsx'],
          dest: './dist/uimmutable.js'
        }]
      }
    },

    concat: {
      development: {
        src: './lib/components/*.jsx',
        dest: './dist/uimmutable.jsx'
      }
    },

    uglify: {
      distribute: {
        src: './dist/uimmutable.js',
        dest: './dist/uimmutable.min.js'
      }
    },

    watch: {

      development: {
        files: ['lib/**/*.*'],
        tasks: [
          'distribute'
        ],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('development', [
    'concat:development',
    'babel:development'
  ]);

  grunt.registerTask('distribute', [
    'concat:development',
    'babel:development',
    'uglify:distribute'
  ]);

};
// - -------------------------------------------------------------------- - //
