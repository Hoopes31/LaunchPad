import gulp from 'gulp'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import {reload} from 'browser-sync'
import nodemon from 'nodemon'
import del from 'del'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'

const paths = {

  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
  webpackFile: 'webpack.config.babel.js',
  publicDir: 'public'

}

const bs = browserSync.create()

gulp.task('default', ['browser-sync'], () => {
  gulp.watch(paths.allSrcJs, ['reload'])
})

gulp.task('reload', ['main'], () => {
  bs.watch(paths.publicDir).on('change', bs.reload)
})

gulp.task('browser-sync', ['nodemon'], () => {
  bs.init({
     proxy: "http://localhost:3000",
     port: 5000
  })
})

gulp.task('nodemon', ['main'], (cb) => {
  var started = false;

  return nodemon({
    script: 'server.js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    }).on('reload', () => {
      reload({stream:false});
    }, 1000);
})

gulp.task('main', ['build'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.publicDir))
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
