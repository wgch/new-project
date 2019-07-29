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
    // Semantic UI
    gulp.src('./node_modules/semantic-ui-css/semantic.min.css').
        pipe(gulp.dest('./app/css'));
    gulp.src('./node_modules/semantic-ui-css/semantic.min.js').
        pipe(gulp.dest('./app/js'));
    gulp.src('./node_modules/semantic-ui-css/themes/**/**/**/**/**/*').
        pipe(gulp.dest('./app/css/themes'));

    // Font Awesome
    gulp.src('./bower_components/font-awesome/css/**/*').
        pipe(gulp.dest('./app/css'));
    gulp.src('./bower_components/font-awesome/fonts/**/*').
        pipe(gulp.dest('./app/fonts'));
    gulp.src('./src/fonts/*').
        pipe(gulp.dest('./app/fonts'));

    // Jquery
    gulp.src('./bower_components/jquery/dist/**/*').
        pipe(gulp.dest('./app/js'));

    // ChartJS
    gulp.src('./bower_components/chart.js/dist/**/*').
        pipe(gulp.dest('./app/js'));

    gulp.src('./src/images/**/*').
        pipe(gulp.dest('./app/images'));
        
    done();
});

// Nunjucks compiling
gulp.task('html', function(done) {
	// Gets .html and .nunjucks files in pages
    gulp.src('src/templates/**/*.+(html|nunjucks)').
	// Renders template with nunjucks
		pipe(nunjucksRender({path: ['src/templates']})).
		// Output files in app folder
        pipe(gulp.dest('app'));
    done();
});
gulp.task('html-watch', gulp.series("html", function(done){
    browserSync.reload();
    done();
}));

// Sass
gulp.task('sass', function(done) {
    gulp.src('./src/sass/*.scss').
		//pipe(sass({outputStyle: 'expanded'})).
		//pipe(gulp.dest('./app/css')).
		pipe(sass({outputStyle: 'compressed'})).
		pipe(rename({extname: '.min.css'})).
        pipe(gulp.dest('./app/css'));
    done();
});
gulp.task('sass-watch', gulp.series("sass", function(done){
    browserSync.reload();
    done();
}));


// Copy JS files
gulp.task('js', function(done) {
    gulp.src('./src/js/**/*').
        pipe(gulp.dest('./app/js'));
    done();
});
gulp.task('js-watch', gulp.series("js", function(done){
    browserSync.reload();
    done();
}));


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('assets', 'sass', 'js', 'html', function(done) {
    browserSync.init({server: './app'});

    gulp.watch('./src/sass/*', gulp.series('sass-watch'));
    gulp.watch('./src/js/*', gulp.series('js-watch'));
    gulp.watch('./src/templates/**/*', gulp.series('html-watch'));

    done();
}));


// Default task
gulp.task('default', gulp.series('serve'));
