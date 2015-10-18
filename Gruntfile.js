module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')

  grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      babel : {
        dist : {
          files : {
            './js/dist/app.js' : './js/src/app.js',
          }
        }
      },
      watch : {
        scripts : {
          files : ['./js/src/*.js'],
          tasks : ['babel:dist'],
          options : { spawns : false }
        }
      }
  })


  grunt.registerTask('serve', [
    'babel:dist',
    'watch',
  ])
}
