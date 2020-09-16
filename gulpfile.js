'use strict';
const { src, dest, series, parallel } = require('gulp');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const clean = require("gulp-clean");
const gm = require("gulp-gm");
//const svgmin = require('gulp-svgmin');
const svgo = require('gulp-svgo');
//------------------------------------------------
function svg(cb){
  return src('/src/svg/**/*.svg')
        .pipe(svgo({

        }))
        .pipe(dest('./dist/svgo'));
}
exports.svgo = svg;
//------------------------------------------------

//------------------------------------------------
function photo(cb){
  return src('./src/photo/**/*.*')
  .pipe(dest("./dist/assets/original"))
  .pipe(gm(function(gmfile){
    return gmfile.resize(100, 100);
  }))
  .pipe(dest("./dist/assets/vignette"))
}
exports.photo = photo;
//------------------------------------------------
function nettoyage(cb){
return src('./dist',{read: false})
.pipe(clean())
}
exports.nettoyage = nettoyage;
//------------------------------------------------
function css(cb) {
 return src('./src/sass/**/*.scss')
 .pipe(sass().on('error', sass.logError))
 .pipe(dest('./dist/css'));
};
/*
const ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
gulp.task("default", function () {
 return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
}); */
const inclu = require("gulp-include")
function copiehtml(cb) {
  return src('./src/html/index.html')
  .pipe(dest('./dist'));
}

exports.default = series(svgo,photo,nettoyage,parallel(css, copiehtml));
