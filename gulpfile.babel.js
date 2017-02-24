
import gulp from 'gulp'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import {reload} from 'browser-sync'
import nodemon from 'nodemon'
import del from 'del'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'

const paths = {

  allSrcJs: 'src/**/*.js',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
  webpackFile: 'webpack.config.babel.js',
  publicDir: 'public'

}

gulp.task('default', ['browser-sync'], function() {
  gulp.watch([paths.publicDir], reload);
})

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
     proxy: "http://localhost:3000",
     port: 5000
  })
})

gulp.task('nodemon', ['main'], function (cb) {
  var started = false;

  return nodemon({
    script: 'server.js'
    }).on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    }).on('reload', function() {
      reload({stream:false});
    }, 1000);
})

gulp.task('main', ['build'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
)

gulp.task('build', ['clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
)

gulp.task('clean', () =>
  del(
    paths.distDir,
    paths.clientBundle
  )
)
