var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var karma = require('gulp-karma');
var mocha = require('gulp-mocha');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var shell = require('gulp-shell');

var publicDir = 'public/**/*.js';
var testFiles = ['./test/client/unit.js', './test/client/integration.js'];

//Backbone requires specific order for its dependencies
gulp.task('scripts', function(){
  return gulp.src([
    './public/bower_components/jquery/dist/jquery.js',
    './public/bower_components/underscore/underscore.js',
    './public/bower_components/backbone/backbone.js',
    './public/bower_components/chance/chance.js',
    './node_modules/socket.io-client/socket.io.js',
    './public/client/models/*.js',
    './public/client/collections/*.js',
    './public/client/views/*.js',
    './public/client/**/*.js',
    './public/client/app.js'
  ]).pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/dist/'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('images', function () {
  return gulp.src('./public/client/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })).pipe(gulp.dest('./public/client/images'));
});

gulp.task('watch-public', function(){
  gulp.watch([publicDir, '!public/dist/*.js'], ['scripts']);
});

gulp.task('develop', function(){
  gulp.start('images');
  gulp.start('scripts');
  nodemon({
    script: './server.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/dist/', '.git', 'node_modules/**/node_modules']
  }).on('start', ['watch-public']);
});

gulp.task('default', ['develop']);

gulp.task('test-server', function(){
  return gulp.src(['./test/server/server.js','./test/server/integration.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test-client', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      reporters: ['progress', 'coverage'],
      action: 'run'
    })).on('error', function(err){ throw err; });
});

gulp.task('emojis:fetch', function(){
  return gulp.src('./server/workers/emojis/emojiWorkerSeedData.js', {read: false})
    .pipe(shell(['node <%=  file.path %>']));
});

gulp.task('emojis:download', ['emojis:fetch'], function(){
  return gulp.src('./server/workers/emojis/emojiWorkerStoreEmojisLocal.js', {read: false})
    .pipe(shell(['node <%=  file.path %>']));
});

gulp.task('seed:emojis', ['emojis:fetch', 'emojis:download']);
