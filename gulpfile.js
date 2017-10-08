
var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var gulp        = require('gulp');

/** Helps with graceful failures as you work */

var gutil       = require('gulp-util');

/**
 * Concatenates the JavaScript and CSS together in a single
 * file so you only need one link/script to use in your HTML
 */

var concat      = require('gulp-concat');

/** Makes JavaScript as ugly as your mother is. Mic drop! */

var uglify      = require('gulp-uglify');

/** Efficient and fast SASS library with no Ruby dependency */

var sass        = require('gulp-sass');

/** Adds source maps so you can debug your SCSS with ease */

var sourceMaps  = require('gulp-sourcemaps');

/** Minifies your images */

var imagemin    = require('gulp-imagemin');

/** Minifies css */

var minifyCSS   = require('gulp-clean-css');

/** Keep multiple browsers & devices in sync when building websites*/

var browserSync = require('browser-sync').create();

/** Adds browser prefixes to make CSS development faster */

var autoprefixer = require('gulp-autoprefixer');

/** Organizes and runs the build tasks in a proper sequence */

var gulpSequence = require('gulp-sequence').use(gulp);

/** Cleaner and directory builder */

var shell       = require('gulp-shell');

/** Prevent pipe breaking caused by errors from gulp plugins */

var plumber     = require('gulp-plumber');

/** Renames files E.g. style.css -> style.min.css */

var rename      = require('gulp-rename');

/** Merge media queries */

var mmq         = require('gulp-merge-media-queries');

/** Check if src file is newer than DEST */

var newer = require('gulp-newer');

gulp.task('browserSync', function() {
  fs = require('fs');
  projectURL = fs.readFileSync('../devhost.txt', 'utf8');
  browserSync.init({
    files: ['**/*.html', '*.html'],
    proxy: projectURL,
    options: {
      reloadDelay: 250
    },
    notify: false
  });
});

gulp.task('images', function() {
  gulp.src(['assets/img/raw/**/*.{png,jpg,gif,svg}'])
  .pipe(plumber())
  .pipe(newer('assets/img/'))
  .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
  .pipe(gulp.dest('assets/img/'))
  .pipe(browserSync.stream());
});

gulp.task('scripts-canvas', function() {
  gulp.src([
    'assets/js/custom/**/*.js',
  ])
  .pipe(plumber())
  .pipe(concat('canvas.js'))
  .on('error', gutil.log)
  .pipe(gulp.dest('assets/js/'))
  .pipe( rename( {
    basename: 'canvas',
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( gulp.dest('assets/js/'))
  .pipe(browserSync.stream());
});

gulp.task('scripts-vendors', function() {
  gulp.src('assets/js/vendors/**/*.js')
  .pipe(plumber())
  .pipe(concat('vendors.js'))
  .on('error', gutil.log)
  .pipe(gulp.dest('assets/js/'))
  .pipe( rename( {
    basename: 'vendors',
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( gulp.dest('assets/js/'))
  .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  gulp.src('assets/css/style.scss')
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(sourceMaps.init())
  .pipe(sass({
    errLogToConsole: true,
    outputStyle: 'compact',
    precision: 10
  }))
  .pipe(autoprefixer({
    browsers: autoPrefixBrowserList,
    cascade:  true
  }))
  .on('error', gutil.log)
  .pipe(concat('main.css'))
  .pipe(sourceMaps.write())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream()) /** inject if main.css is in use */
  .pipe( rename( {
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(minifyCSS())
  .pipe( gulp.dest('./'))
  .pipe(browserSync.stream()); /** inject if theme.min.css is in use */
});

/**
 * NOTE we watch HTML files using BrowserSync.init now
 * so there is no HTML watch task
 */

gulp.task('default', ['browserSync', 'scripts-canvas', 'scripts-vendors', 'styles'], function() {
    gulp.watch('assets/js/custom/**/*.js', ['scripts-canvas']);
    gulp.watch('assets/js/vendors/**/*.js', ['scripts-vendors']);
    gulp.watch('assets/css/**/*.{css,scss}', ['styles']);
    gulp.watch('assets/img/raw/*', ['images']);
});

gulp.task( 'production', [
  'styles',
  'scripts-canvas',
  'scripts-vendors',
  'images'
]);
