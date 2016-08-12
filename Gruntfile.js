module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      copy: {
        main: {
          files: [
            { src : 'app/src/package.json', dest : 'app/dist/package.json' },
            { src : 'app/src/index.js', dest : 'app/dist/index.js' },
            { src : 'app/src/index.html', dest : 'app/dist/index.html' },
            { src : 'app/src/css/*.css', dest : 'app/dist/css', expand : true, flatten : true },
            { src : 'app/src/js/*.js', dest : 'app/dist/js', expand : true, flatten : true },
            {
              src: [
                'bower_components/bootstrap/dist/css/*.min.css',
                'bower_components/bootstrap-material-design/dist/css/*.min.css',
              ],
              dest: 'app/dist/css/',
              expand: true,
              flatten: true,
            },
            {
              src: [
                'bower_components/bootstrap/dist/js/*.min.js',
                'bower_components/bootstrap-material-design/dist/js/*.min.js',
                'bower_components/jquery/dist/*.js'
              ],
              dest: 'app/dist/js',
              expand: true,
              flatten: true,
            },
            {
              src : [
                'bower_components/bootstrap-material-design/dist/fonts/*.*'
              ],
              dest : 'app/dist/fonts',
              expand : true,
              flatten : true,
            }
          ]
        }
      },
      bower: {
        dev: { dest: 'app', }
      },
      babel: {
        dist: {
          files: {
            './app/dist/js/app.js' : './app/src/js/app.js',
          }
        }
      },
      watch: {
        scripts: {
          files: ['./app/src/**/*.js'],
          tasks: ['babel:dist'],
          options: { spawns : false }
        }
      },
      shell: {
        npm: {
          command: 'cd app/dist && npm install'
        }
      },
      electron: {
        all: {
          options: {
            name: 'SubsPlease',
            dir: './app/dist',
            out: './build',
            version: '1.3.3',
            platform: 'all',
            arch: 'x64',
            icon: './icon/Icon',
            prune: true,
            overwrite: true,
          }
        }
      }
  })


  grunt.registerTask('serve', [
    'copy',
    'shell:npm',
    'babel:dist',
    'watch',
  ])

  grunt.registerTask('build', [
    'copy',
    'shell:npm',
    'babel:dist',
    'electron',
  ])
}
