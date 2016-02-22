var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var concat      = require('gulp-concat');

/**
 * Serve the Harp Site from the public directory
 */

gulp.task('concat', function() {
  return gulp.src([
    'public/assets/js/lib/jq.js',
    'public/assets/js/lib/*.js',
    'public/assets/js/functions/*.js',
    'public/assets/js/script.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/assets/js/dist/'));
});

gulp.task('serve', function () {
  harp.server(__dirname + '/public', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      // open: true,
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch("public/**/*.scss", function () {
      reload("main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["public/**/*.ejs", "public/**/*.jade" "public/**/*.json", "public/**/*.js"], function () {
      reload();
    });


  gulp.watch('public/assets/js/**/*.js', ['concat'], function () {
    reload();
  });



  })
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the harp site, launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);