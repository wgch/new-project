const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const nunjucksRender = require('gulp-nunjucks-render');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const reload = function() {
    browserSync.reload();
};

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

// CSS + Tailwind
gulp.task('tailwind', function(done) {
    gulp.src("./src/css/*.css") // read .css files from ./src/ folder
        .pipe(postcss()) // compile using postcss
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("./app/css")) // paste them in ./assets/css folder
        .pipe(browserSync.stream());
    done();
});
gulp.task("tailwind-watch", gulp.series("tailwind", function(done){
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
    gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/images'));
    done();
});
gulp.task("images-watch", gulp.series("images", function(done){
    browserSync.reload();
    done();
}));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('tailwind', 'js', 'images', 'html', function(done) {
    browserSync.init({server: './app'});

    //gulp.watch('./src/sass/*', gulp.series('sass-watch'));
    gulp.watch('./src/css/*', gulp.series('tailwind-watch'));
    gulp.watch('./src/js/*', gulp.series('js-watch'));
    gulp.watch('./src/images/*', gulp.series('images-watch'));
    gulp.watch('./src/templates/**/*', gulp.series('html-watch'));
    done();
}));


// Default task
gulp.task('default', gulp.series('serve'));
