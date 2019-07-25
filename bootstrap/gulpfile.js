const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const nunjucksRender = require('gulp-nunjucks-render');
const reload = function() {
    browserSync.reload();
};
// Copy assets
gulp.task('assets', function(done) {
    gulp.src('./bower_components/bootstrap/dist/**/*').
		pipe(gulp.dest('./app/deps/bootstrap'));
    gulp.src('./bower_components/font-awesome/web-fonts-with-css/**/*').
		pipe(gulp.dest('./app/deps/fa'));
    gulp.src('./bower_components/jquery/dist/**/*').
    	pipe(gulp.dest('./app/deps/jquery'));

	gulp.src('./src/fonts/*').
		pipe(gulp.dest('./app/fonts'));
	done();
});
// Nunjucks compiling
gulp.task('html', function(done) {
    gulp.src('src/templates/**/*.+(html|nunjucks)').
		pipe(nunjucksRender({path: ['src/templates']})).
		pipe(gulp.dest('app'));
    done();
});
gulp.task("html-watch", gulp.series("html", function(done){
    browserSync.reload();
    done();
}));

// Sass
gulp.task('sass', function(done) {
    gulp.src('./src/sass/*.scss').
		pipe(sass({outputStyle: 'expanded'})).
		pipe(gulp.dest('./app/css')).
		pipe(sass({outputStyle: 'compressed'})).
		pipe(rename({extname: '.min.css'})).
		pipe(gulp.dest('./app/css'));
    done();
});
gulp.task("sass-watch", gulp.series("sass", function(done){
    browserSync.reload();
    done();
}));

// Copy JS files
gulp.task('js', function(done) {
    gulp.src('./src/js/**/*').
		pipe(gulp.dest('./app/js'));
    done();
});
gulp.task("js-watch", gulp.series("js", function(done){
    browserSync.reload();
    done();
}));

// Copy images
gulp.task('images', function(done) {
    gulp.src('./src/images/**/*').
        pipe(gulp.dest('./app/images'));
    done();
});
gulp.task("images-watch", gulp.series("images", function(done){
    browserSync.reload();
    done();
}));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('assets', 'sass', 'js', 'images', 'html', function(done) {
    browserSync.init({server: './app'});

    gulp.watch('./src/sass/*', gulp.series('sass-watch'));
    gulp.watch('./src/js/*', gulp.series('js-watch'));
    gulp.watch('./src/images/*', gulp.series('images-watch'));
    gulp.watch('./src/templates/**/*', gulp.series('html-watch'));
    done();
}));


// Default task
gulp.task('default', gulp.series('serve'));
