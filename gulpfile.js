'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	del = require('del');

gulp.task('clean' , function(){
	return del('public');
});

/* Complete SASS */
gulp.task('sass' , function(){
	gulp.src('src/scss/*.scss')
	.pipe(sass().on('error' , sass.logError))
	.pipe(gulp.dest('public/css/'))
	.pipe(browserSync.reload({stream: true}))
});

/* Pug(Jade) */
gulp.task('pug' , function(){
	gulp.src('src/**/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
});

/* JavaScript&jQuery */
gulp.task('js' , function(){
	gulp.src('src/js/*.js')
		.pipe(gulp.dest('public/js/'))
		.pipe(browserSync.reload({stream: true}))
});

/* Images */
gulp.task('images' , function(){
	gulp.src('src/images/**.**')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'))
		.pipe(browserSync.reload({stream: true}))
});

/* Browser-sync */
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
});

gulp.task('watch' , ['browser-sync' , 'pug' , 'sass' , 'images' , 'js'] , function(){
	gulp.watch('src/scss/*.scss' , ['sass']);
	gulp.watch('src/*.pug' , ['pug']);
	gulp.watch('src/js/*.js' , ['js']);
	gulp.watch('src/images/**.**' , ['images']);
});