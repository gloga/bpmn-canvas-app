// Include gulp
var gulp = require('gulp');

// Run commands
var exec = require('child_process').exec;

// Automatically load gulp plugins from package.json
var  plugins = require('gulp-load-plugins')({
        pattern: '*', // by default, it only loads plugins prefixed "gulp-"
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.concat('all.min.css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(plugins.browserSync.stream());
});

// Image Assets
gulp.task('images', function() {
    return gulp.src('./src/**/*.+(jpg|jpeg|gif|png|svg)')
        .pipe(plugins.rename({dirname: ''}))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(plugins.browserSync.stream());
});

// Minify JS
gulp.task('scripts', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(plugins.uglify())
        .pipe(plugins.concat('all.min.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(plugins.browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function() {
    // Static gulp server
    plugins.browserSync.init({
        server: "./dist"
    });
    gulp.watch('./src/assets/js/*.js', ['scripts']);
    gulp.watch('./src/assets/css/**/*.scss', ['sass']);
    gulp.watch('./src/*.html');
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch','images']);
