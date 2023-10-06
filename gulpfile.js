const { src, dest, watch, parallel } = require('gulp');
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require('gulp-cssnano');
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src("app/*.html")
    .pipe (gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    return gulp.src("app/sass/*.sass")
    .pipe(concat('styles.sass'))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src("app/js/*.js")
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task('img', () => {
    return gulp.src("app/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin ({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
})

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./dist" // Вказуйте шлях до папки з вашими статичними файлами
        }
    });
    gulp.watch("app/*html", gulp.parallel('html'));
    gulp.watch("app/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("app/js/*.js", gulp.parallel('scripts'));
    gulp.watch("app/img/*.+(jpg|jpeg|png|gif)", gulp.parallel('scripts'));
});

gulp.task('default', gulp.series('html', 'sass', 'scripts', 'img', 'watch'));

/*function defaultTask(cb) {
    cb();
}

exports.default = defaultTask;*/