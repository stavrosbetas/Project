//Finally i will use Sass instead of Less
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

// This task is to develop the page without refreshing the page
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/sass/**/*.sass', ['sass']); 
});

// Plugin gul-sass to compile and minify Sass to CSS. 
gulp.task('sass', function() {
  // Get all .sass files and from the sass folder and save it to css format in app/css folder
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: "compressed"}))// Minify Css
    .pipe(gulp.dest('app/dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify the javascript files and save it to app/dist/js folder
gulp.task('uglify',function(){
	gulp.src('app/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('app/dist/js'));
});

// Optimizing the images and svg and save it to app/dist/images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('app/dist/images'))
});