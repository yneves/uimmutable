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
      components: {
        options: {
          presets: ['es2015', 'react']
        },
        files: [{
          src: ['./dist/components.jsx'],
          dest: './dist/components.js'
        }]
      }
    },

    concat: {
      components: {
        src: ['./lib/utils/*.js', './lib/components/*.jsx'],
        dest: './dist/components.jsx'
      },
      distribute: {
        src: [
          './node_modules/moment/moment.js',
          './node_modules/moment/locale/pt-br.js',
          './node_modules/react-onclickoutside/index.js',
          './node_modules/react-datepicker/dist/react-datepicker.js',
          './dist/components.js'
        ],
        dest: './dist/uimmutable.js'
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
    'concat:components',
    'babel:components',
    'concat:distribute'
  ]);

  grunt.registerTask('distribute', [
    'concat:components',
    'babel:components',
    'concat:distribute',
    'uglify:distribute'
  ]);

};
// - -------------------------------------------------------------------- - //
