const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const nunjucksRender = require('gulp-nunjucks-render');
const reload = function() {
    browserSync.reload();
};
// Copy assets
gulp.task('assets', function() {
    gulp.src('./bower_components/bootstrap/dist/**/*').
			pipe(gulp.dest('./app'));
    gulp.src('./bower_components/font-awesome/css/**/*').
			pipe(gulp.dest('./app/css'));
    gulp.src('./bower_components/font-awesome/fonts/**/*').
			pipe(gulp.dest('./app/fonts'));
		gulp.src('./src/fonts/*').
			pipe(gulp.dest('./app/fonts'));
    gulp.src('./bower_components/jquery/dist/**/*').
			pipe(gulp.dest('./app/js'));
		gulp.src('./bower_components/chart.js/dist/**/*').
			pipe(gulp.dest('./app/js'));
    gulp.src('./src/images/**/*').
    	pipe(gulp.dest('./app/images'));
});

// Nunjucks compiling
gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
    return gulp.src('src/templates/**/*.+(html|nunjucks)').
	// Renders template with nunjucks
		pipe(nunjucksRender({path: ['src/templates']})).
		// Output files in app folder
		pipe(gulp.dest('app'));
});

// Sass
gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss').
		pipe(sass({outputStyle: 'expanded'})).
		pipe(gulp.dest('./app/css')).
		pipe(sass({outputStyle: 'compressed'})).
		pipe(rename({extname: '.min.css'})).
		pipe(gulp.dest('./app/css'));
});

// Copy JS files
gulp.task('js', function() {
    gulp.src('./src/js/**/*').
		pipe(gulp.dest('./app/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['assets', 'sass', 'js', 'nunjucks'], function() {
    browserSync.init({server: './app'});

    gulp.watch('./src/sass/*', ['sass', reload]);
    gulp.watch('./src/js/*', ['js', reload]);
    gulp.watch('./src/templates/**/*', ['nunjucks', reload]);
});


// Default task
gulp.task('default', ['serve']);
