var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    rename = require("gulp-rename"),
    expectFiles = require('gulp-expect-file'),
    cordovaXml = require('gulp-cordova-xml');
    argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'assets', 'scripts', 'config'],
    function(){
      gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
      gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
      gulpWatch('app/config/*.js', function(){ gulp.start('config'); });
      gulpWatch('app/assets/**/*', function(){ gulp.start('assets'); });
      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'scripts', 'assets', 'config'],
    function(){
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});


gulp.task("config", function() {
    var target = process.env.TARGET || '';
    target = target.toLowerCase();
    
    if(target && target !== 'prod') {
      target = '.' + target.toLowerCase();
    } else {
      target = '';
    }

    var configFile = "app/config/config" + target + ".js";
    console.log ("Picking Config :" + configFile);

    gulp.src(configFile)
        .pipe(expectFiles(configFile))
        .on('error', function (err) { process.exit(1); })
        .pipe(rename("config.js"))
        .pipe(gulp.dest("www/build/js/"));


    var configXmlFile = "app/config/config" + target + ".xml";
    console.log ("Picking Config :" + configXmlFile);

    gulp.src(configXmlFile)
        .pipe(expectFiles(configXmlFile))
        .on('error', function (err) { process.exit(1); })
        .pipe(rename("config.xml"))
        .pipe(gulp.dest("./"));
});


gulp.task("assets", function() {

    gulp.src(["app/assets/images/*"])
        .pipe(gulp.dest("www/build/images"));

    gulp.src([
          "node_modules/font-awesome/css/font-awesome.css",
          "node_modules/froala-editor/css/froala_editor.css",
          "node_modules/froala-editor/css/froala_style.css",
           "node_modules/froala-editor/css/plugins/char_counter.min.css",
        ])
        .pipe(gulp.dest("www/build/css"));

     gulp.src([
          "node_modules/jquery/dist/jquery.js",
          "node_modules/froala-editor/js/froala_editor.min.js",
          "node_modules/froala-editor/js/plugins/font_size.min.js",
          "node_modules/froala-editor/js/plugins/lists.min.js",
          "node_modules/froala-editor/js/plugins/image.min.js",
          "node_modules/froala-editor/js/plugins/align.min.js",
          "node_modules/froala-editor/js/plugins/quote.min.js",
           "node_modules/froala-editor/js/plugins/char_counter.min.js"
        ])
        .pipe(gulp.dest("www/build/js"));
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', function() {
  return copyFonts({
    src: ['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)', 'node_modules/font-awesome/fonts/**/*.+(ttf|woff|woff2)']
  })
});
gulp.task('scripts', copyScripts);
gulp.task('clean', function(){
  return del('www/build');
});
gulp.task('lint', tslint);
