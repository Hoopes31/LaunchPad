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
  clientEntryPoint: 'src/client/app.js',
  clientBundle: 'public/',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
  webpackFile: 'webpack.config.babel.js',
  publicDir: 'public'

}

gulp.task('default', ['main', 'watch'], () => {
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('clean', () =>
  del(
    paths.distDir
  )
)

gulp.task('build', ['clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
)

gulp.task('main', ['build'], () => {
   gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.clientBundle))
})