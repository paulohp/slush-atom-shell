var gulp  = require('gulp');
var shell = require('gulp-shell');
var atom  = require('gulp-atom');

// Run project
gulp.task('run', function() {
  return atom({
      srcPath: './src',
      releasePath: './release',
      cachePath: './cache',
      version: 'v0.12.4',
      rebuild: true,
      platforms: ['osx']
  });
})

// Compile project
gulp.task('osx', shell.task([

]))

// Compile project
gulp.task('win', shell.task([

]))

// Compile project
gulp.task('linux', shell.task([

]))

gulp.task('default', ['atom']);