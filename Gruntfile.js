// Gruntfile
module.exports = function(grunt) {

  // Initializing the configuration object
  grunt.initConfig({

    // Read in project settings
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration
    concat: {
      options: {
        separator: ';\n'
      },
      frontend: {
        src: [
          './bower_components/modernizr/modernizr.js',
          './bower_components/jquery/dist/jquery.js',
          './bower_components/underscore/underscore.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './bower_components/angular/angular.js',
          './bower_components/angular-route/angular-route.js',
          './bower_components/angular-resource/angular-resource.js',
          './bower_components/angular-animate/angular-animate.js',
          './bower_components/angular-cookies/angular-cookies.js',
          './bower_components/angular-touch/angular-touch.js',
          './bower_components/angular-sanitize/angular-sanitize.js',
          './app/assets/js/frontend.js'
        ],
        dest: './public/assets/js/frontend.js'
      },
      backend: {
        src: [
          './bower_components/modernizr/modernizr.js',
          './bower_components/jquery/dist/jquery.js',
          './bower_components/underscore/underscore.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './bower_components/angular/angular.js',
          './bower_components/angular-route/angular-route.js',
          './bower_components/angular-resource/angular-resource.js',
          './bower_components/angular-animate/angular-animate.js',
          './bower_components/angular-cookies/angular-cookies.js',
          './bower_components/angular-touch/angular-touch.js',
          './bower_components/angular-sanitize/angular-sanitize.js',
          './app/assets/js/backend.js'
        ],
        dest: './public/assets/js/backend.js'
      }
    },
    copy: {
      ico: {
        expand: true,
        cwd: './app/assets/ico/',
        src: '**',
        dest: './public/assets/ico/',
        flatten: true,
        filter: 'isFile'
      },
      fonts: {
        expand: true,
        cwd: './bower_components/bootstrap/dist/fonts/',
        src: '**',
        dest: './public/assets/fonts/',
        flatten: true,
        filter: 'isFile'
      },
      images: {
        expand: true,
        cwd: './app/assets/images/',
        src: '**',
        dest: './public/assets/images/',
        flatten: false,
        filter: 'isFile'
      },
      templates: {
        expand: true,
        cwd: './app/assets/templates/',
        src: '**',
        dest: './public/assets/templates/',
        flatten: true,
        filter: 'isFile'
      }
    },
    less: {
      dev: {
        options: {
          compress: false
        },
        files: {
          './public/assets/css/frontend.css': './app/assets/css/frontend.less',
          './public/assets/css/backend.css': './app/assets/css/backend.less'
        }
      },
      pro: {
        options: {
          compress: true
        },
        files: {
          './public/assets/css/frontend.css': './app/assets/css/frontend.less',
          './public/assets/css/backend.css': './app/assets/css/backend.less'
        }
      }
    },
    uglify: {
      options: {
        mangle: false // Use if you want the names of your functions and variables unchanged
      },
      frontend: {
        files: {
          './public/assets/js/frontend.js': './public/assets/js/frontend.js'
        }
      },
      backend: {
        files: {
          './public/assets/js/backend.js': './public/assets/js/backend.js'
        }
      }
    },
    phpunit: {
      classes: {
        dir: 'app/tests/' // location of the tests
      },
      options: {
        bin: 'vendor/bin/phpunit',
        colors: true
      }
    },
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
      js: {
        files: ['./app/assets/js/frontend.js', './app/assets/js/backend.js'],
        tasks: ['concat:frontend', 'concat:backend'],
        options: {
          livereload: true
        }
      },
      images: {
        files: ['./app/assets/images/**'],
        tasks: ['copy:images'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['./app/assets/templates/*.html'],
        tasks: ['copy:templates'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['./app/assets/css/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      tests: {
        files: ['app/controllers/*.php', 'app/models/*.php'],
        tasks: ['phpunit']
      }
    } // end watch

  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-phpunit');

  // Task definition
  grunt.registerTask('build', ['concat:frontend', 'concat:backend', 'less:dev', 'copy']);
  grunt.registerTask('build-prod', ['concat:frontend', 'concat:backend', 'uglify', 'less:pro', 'copy']);
  grunt.registerTask('default', ['watch']);
};