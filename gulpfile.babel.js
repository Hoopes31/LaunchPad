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

<<<<<<< HEAD
gulp.task('default', ['main', 'nodemon'], () => {
=======
gulp.task('default', ['main', 'watch'], () => {
})

gulp.task('watch', () => {
>>>>>>> 4a551ea07537d37d1ad31a3472aad66e61c1c7f9
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
<<<<<<< HEAD
})

gulp.task('nodemon', ['main'], () => {
    nodemon({
      script: 'server.js'
    })
=======
>>>>>>> 4a551ea07537d37d1ad31a3472aad66e61c1c7f9
})