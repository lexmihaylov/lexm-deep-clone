var gulp = require("gulp");
var shell = require('gulp-shell');
var qunit = require("gulp-qunit");

gulp.task('default', [
    'docs'
]);

gulp.task('docs', shell.task([
    'jsdoc2md ./main.js > README.md'   
]));

gulp.task('test', function() {
    gulp.src('test/test.html')
        .pipe(qunit());
});