'use strict';
const { src, dest, series, parallel } = require('gulp');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function css(cb) {
 return src('./src/sass/**/*.scss')
 .pipe(sass().on('error', sass.logError))
 .pipe(dest('./dist/css'));
};

const ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
gulp.task("default", function () {
 return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
}); 


exports.default = css
