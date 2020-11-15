const { series, parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const terser = require('gulp-terser');
let uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');

function clean(cb) {
    // body omitted
    cb();
}

function css(cb) {
    // body omitted
    cb();
    return src(['assets/css/*.css'])
        .pipe(concat('main.css'))
        .pipe(purgecss({
            content: ['omb/*.html']
        }))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gzip({ append: false }))
        .pipe(dest('output/'));
}

function javascript(cb) {
    // body omitted
    cb();
    return src(['assets/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(gzip({ append: false }))
        .pipe(dest('output/'));
}

exports.build = series(clean, parallel(css, javascript));