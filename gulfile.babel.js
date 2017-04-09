import gulp from 'gulp'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import {reload} from 'browser-sync'
import nodemon from 'nodemon'
import del from 'del'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'
import gulpFunction from 'gulp-function'

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

gulp.task('default', ['browser-sync', 'watch'], () => {
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('browser-sync', ['nodemon'], () => {
  bs.init({
     proxy: "http://localhost:3000",
     port: 5000
  })
})

gulp.task('nodemon', (cb) => {
  var started = false;

  return nodemon({
    script: 'server.js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    })
});


gulp.task('main', ['build'], () => {
   gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.publicDir))
    .pipe(gulpFunction(myFunction))
})

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

let myFunction = () => {

  setTimeout( () => {
    bs.reload()
  }, 500)
}

