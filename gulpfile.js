var { src, dest, parallel } = require('gulp');
var { watch, src, dest, parallel, series } = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pug = require('gulp-pug');
// var webpack = require('webpack-stream');
// Указываем функции, которые будут доступны из терминала
// Команда «по умолчанию» -- default -- будет срабатывать при вызове gulp без аргументов
exports.default = parallel(buildPages, buildStyles, buildScripts, buildAssets);

// function buildScripts() {
//   return src('src/scripts/index.js')
//   .pipe(webpack({ output: { filename: 'bundle.js' } }))
//   .pipe(dest('build/scripts/'));
// }


// Сборка
function buildPages() {
  return src('src/pages/index.html')
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/styles/main.scss')
    .pipe(dest('build/styles/'));
}

function buildScripts() {
  return src('src/scripts/**/*.js')
    .pipe(dest('build/scripts/'));
}

function buildAssets() {
  return src('src/assets/**/*.*')
    .pipe(dest('build/assets/'));
}

function watchFiles() {
  watch('src/pages/*.html', buildPages);
  watch('src/styles/*.css', buildStyles);
  watch('src/scripts/**/*.js', buildScripts);
  watch('src/assets/**/*.*', buildAssets);
}

// Соберём и начнём следить
exports.default = series(
  parallel(buildPages, buildStyles, buildScripts, buildAssets),
  watchFiles
);




// Девсервер
function devServer(cb) {
  var params = {
    watch: true,
    reloadDebounce: 150,
    notify: false,
    server: { baseDir: './build' },
  };

  browserSync.create().init(params);
  cb();
}



// Отслеживание
function watchFiles() {
  watch('src/pages/*.html', buildPages);
  watch('src/styles/*.css', buildStyles);
  watch('src/scripts/**/*.js', buildScripts);
  watch('src/assets/**/*.*', buildAssets);
  watch('src/styles/*.scss', buildStyles);
}

exports.default =
  parallel(
    devServer,
    series(
      parallel(buildPages, buildStyles, buildScripts, buildAssets),
      watchFiles
    )
  );

  


function clearBuild() {
  return del('build/');
}


exports.default =
  series(
    clearBuild,
    parallel(
      devServer,
      series(
        parallel(buildPages, buildStyles, buildScripts, buildAssets),
        watchFiles
      )
    )
  );


  
  
  /*
    Опционально можно описать и передать в Пламбер свой
    обработчик ошибок. Например, чтобы красиво выводить их в консоль
    или показывать системные оповещения (см. gulp-notify)
   */
  function errorHandler(errors) {
    console.warn('Error!');
    console.warn(errors);
  }
  
  function buildSomething() {
    return src('src/pages/*.html')
      // Пламбер вешается в самом начале потока
      .pipe(plumber({ errorHandler }))
      .pipe(someTransformation())
      .pipe(anotherTransformation())
      .pipe(dest('build/'));
  }

  function buildStyles() {
    return src('src/styles/main.scss')
      .pipe(sass())
      .pipe(postcss([
        autoprefixer(),
        cssnano()
      ]))
      .pipe(dest('build/styles/'));
  }





  function buildPages() {
    // Пути можно передавать массивами
    return src('src/pages/index.pug')
      .pipe(pug())
      .pipe(dest('build/'));
  }

  function watchFiles() {
    // Обычно при работе с Пагом файлы разносятся по разным подпапкам,
    // важно учесть это и отслеживать изменения не только страниц в /pages

    // А вот собирать лучше только то, что лежит в /pages, именно там будут шаблоны всех страниц,
    // к которым уже подключены блоки из подпапок
    watch(['src/pages/**/*.pug', 'src/blocks/**/*.pug'], buildPages);
    watch('src/styles/*.scss', buildStyles);
    watch('src/scripts/**/*.js', buildScripts);
    watch('src/assets/**/*.*', buildAssets);
  }


  var imagemin = require('gulp-imagemin');

  function buildAssets(cb) {
    // Уберём пока картинки из общего потока
    src(['src/assets/**/*.*', '!src/assets/img/**/*.*'])
      .pipe(dest('build/assets/'));

    src('src/assets/img/**/*.*')
      .pipe(imagemin())
      .pipe(dest('build/assets/img'));

    // Раньше функция что-то вовзращала, теперь добавляем вместо этого искусственый колбэк
    // Это нужно, чтобы Галп понимал, когда функция отработала и мог запустить следующие задачи
    cb();
  }
 

      