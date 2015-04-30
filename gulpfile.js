var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');

var paths = {
    about:['./www/js/about/*.js'],
    account: ['./www/js/account/*.js'],
    main: ['./www/js/main/app.main.js', './www/js/main/*service.js'],
    map:['./www/js/map/map.js', './www/js/map/map*.js'],
    modules: ['./www/js/main/main.all.js', './www/js/about/about.all.js', './www/js/account/account.all.js', './www/js/map/map.all.js'],
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'scripts']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.about, ['concat.about']);
    gulp.watch(paths.account, ['concat.account']);
    gulp.watch(paths.map, ['concat.map']);
    gulp.watch(paths.main, ['concat.main']);
    gulp.watch(paths.modules, ['scripts']);
});

gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['www/js/app.js'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
});

gulp.task('concat.about', function () {
    //concat about files
    return gulp.src(paths.about)
        .pipe(concat('about.all.js'))
        .pipe(gulp.dest('www/js/about/'));
});

gulp.task('concat.account', function () {
    //concat account files
    return gulp.src(paths.account)
        .pipe(concat('account.all.js'))
        .pipe(gulp.dest('www/js/account/'));
});

gulp.task('concat.main', function () {
    //concat main files
    return gulp.src(paths.main)
        .pipe(concat('main.all.js'))
        .pipe(gulp.dest('www/js/main/'));
});

gulp.task('concat.map', function () {
    //concat map files
    return gulp.src(paths.map)
        .pipe(concat('map.all.js'))
        .pipe(gulp.dest('www/js/map/'));
});

gulp.task('scripts', ['clean', 'concat.about', 'concat.account', 'concat.main', 'concat.map'], function () {
    //concat script files
    return gulp.src(paths.modules)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/js/'));
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
