const { series, src, dest, watch, parallel } = require('gulp');
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const jsonmin = require('gulp-jsonmin');
const cssnano = require('gulp-cssnano');
const autoprefixer = require("gulp-autoprefixer");
const fileInclude = require("gulp-file-include")
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

const html_task = () => src('app/*.html')
        .pipe(fileInclude())
        .pipe (gulp.dest('dist'))
        .pipe(browserSync.stream());


const sass_task = () => src("app/sass/*.scss")
        .pipe(concat('style.scss'))
        .pipe(sass())
        // .pipe(autoprefixer({
        //     // browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());

const css_task = () => src("app/css/*.css")
        .pipe(cssnano())
        .pipe(concat('style.css'))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());

 const json_task = () => src('app/json/*.json')
        .pipe(jsonmin())
        .pipe(dest('dist'));
         
const scripts_task = () => src("app/js/*.js")
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());

const img_task = () => src("app/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin ({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());

const watch_task = () => {

    browserSync.init({
        server: {
            baseDir: "./dist" // Вказуйте шлях до папки з вашими статичними файлами
        }
    });

    watch('app/*html', parallel(html_task));
    watch("app/sass/*.sass", parallel(sass_task));
    watch("app/js/*.js", parallel(scripts_task));
    watch("app/json/*.json", parallel(json_task));
    watch('app/css/*.css', parallel(css_task));
    watch("app/img/*.+(jpg|jpeg|png|gif)", parallel(scripts_task));
}

exports.default = series(html_task, sass_task, scripts_task, css_task, json_task, img_task, watch_task);

/*function defaultTask(cb) {
    cb();
}

exports.default = defaultTask;*/