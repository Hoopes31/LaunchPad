import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
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

gulp.task('default', ['main', 'nodemon'], () => {
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

gulp.task('nodemon', ['main'], () => {
    nodemon({
      script: 'server.js'
    })
})