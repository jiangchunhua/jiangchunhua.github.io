// JavaScript Document
var gulp=require('gulp');
var uglify=require('gulp-uglify');
var csso=require('gulp-csso');
var imagemin=require('gulp-imagemin');

gulp.task('compress',function(){
	return gulp.src("js/**/*.js")
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('csso',function(){
	return gulp.src('css/*.css')
		.pipe(csso())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('images',function(){
	return gulp.src('images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
})
gulp.task('default',['images']);