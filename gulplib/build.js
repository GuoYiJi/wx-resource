let _build, _Watch, sass, babel, base64, cru, gutil, gulp, replace, rename, color, _setting, Tools, indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

gulp = require('gulp')
sass = require('gulp-sass')
babel = require('gulp-babel')
base64 = require('gulp-base64')
cru = require('gulp-css-rework-url');
replace = require('gulp-replace')
rename = require('gulp-rename')
_Watch = require('gulp-watch')
gutil = require('gulp-util')
_setting = require('./setting')
Tools = require('./Tools');
color = gutil.colors;
_build = {
  template: function (file, type = 'dev'){
    let buildSrc
    buildSrc = type === 'dev' ? _setting.devPath : _setting.buildPath
    gulp.src(file, {base: _setting.path})
      .pipe(rename((path) => {
        path.extname = '.wxml'
      }))
      .pipe(gulp.dest(buildSrc))
  },
  css: function (file, type = 'dev'){
    let buildSrc, sfiles
    buildSrc = type === 'dev' ? _setting.devPath : _setting.buildPath
    gulp.src(file, {base: _setting.path})
      .pipe(sass())
        .on('error', gutil.log)
      .pipe(cru({
        prefix: _setting.path
      }, (files) => {
        sfiles = files
      }))
      .pipe(base64({
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        maxImageSize: 100 * 1024, // bytes
        debug: false
      }))
      .pipe(rename((path) => {
        path.extname = '.wxss'
      }))
      .pipe(gulp.dest(buildSrc))
  },
  js: function (file, type = 'dev'){
    let buildSrc
    buildSrc = type === 'dev' ? _setting.devPath : _setting.buildPath
    if (type === 'dev') {
      gulp.src(file, {base: _setting.path})
        .pipe(babel({
          presets: ['es2015']
        }))
          .on('error', gutil.log)
        .pipe(replace('DEBUG', 'dev'))
        .pipe(gulp.dest(buildSrc))
    } else {
      gulp.src(file, {base: _setting.path})
        .pipe(babel({
          presets: ['es2015']
        }))
          .on('error', gutil.log)
        .pipe(replace('DEBUG', 'pre'))
        .pipe(gulp.dest(buildSrc))
    }
  },
  assets: function (file, type = 'dev'){
    let buildSrc
    buildSrc = type === 'dev' ? _setting.devPath : _setting.buildPath
    gulp.src(file, {base: _setting.path})
      .pipe(gulp.dest(buildSrc))
  },
  watch: function (){
    return _Watch(_setting.watchFiles, (file) => {

      let _event, _file_path, _type, err, watch_timer, _list = [], _this;
      _this = this
      try {
        _event = file.event;
        if (_event !== 'undefined') {
          _file_path = file.path.replace(/\\/g, '/');
          if (indexOf.call(_list, _file_path) < 0) {
            _list.push(_file_path);
            gutil.log('\'' + color.cyan(file.relative) + '\'', "was " + _event);
            _type = Tools.getType(_file_path);
            switch (_type) {
              case 'scss':
                _this.css(_file_path);
                break;
              case 'js':
                _this.js(_file_path);
                break;
              case 'tpl':
                _this.template(_file_path);
                break;
              default:
                _this.assets(_file_path)
            }
          }
        }
        if (watch_timer) {
          clearTimeout(watch_timer);
        }
        return watch_timer = setTimeout(function() {
          return _list = [];
        }, 3000);
      } catch (_error) {
        err = _error;
        return console.log(err);
      }
    })
  }
}

module.exports = _build
