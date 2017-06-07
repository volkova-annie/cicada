const gulp = require('gulp')
const sass = require('gulp-sass')
const moduleImporter = require('sass-module-importer')
const pug = require('gulp-pug')

const babel = require('gulp-babel')
const concat = require('gulp-concat')

const autoprefixer = require('gulp-autoprefixer')
const del = require('del')
const browserSync = require('browser-sync').create()

gulp.task('styles', () => {
  return gulp.src('./src/styles/manifest.sass')
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/styles'))
})

gulp.task('views', () => {
  return gulp.src('./src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public'))
})

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'));
})

gulp.task('clean', () => {
  return del('public')
})

gulp.task('build',
  gulp.series('clean',
    gulp.parallel('views', 'styles', 'js')
  )
)

gulp.task('watch', () => {
  gulp.watch('./src/styles/**/*.sass', gulp.series('styles'))
  gulp.watch('./src/**/*.pug', gulp.series('views'))
  gulp.watch('./src/js/**/*.js', gulp.series('js'))
})

gulp.task('serve', () => {
  browserSync.init({
    server: 'public',
    port: 8080,
    ui: {
      port: 8081,
    },
  })
  browserSync.watch('public/**/*.*').on('change', browserSync.reload)
})

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')))
