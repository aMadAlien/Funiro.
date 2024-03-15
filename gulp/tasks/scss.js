import dartSass from 'sass';
import gulpSass from 'gulp-sass';
// to rename 'style.css' to 'style.min.css' 
import rename from 'gulp-rename';
// squeeze scss file
import cleanCss from 'gulp-clean-css';
// for imgs
import webpcss from 'gulp-webpcss';
// add prefixes for cross-browsering
import autoprefixer from 'gulp-autoprefixer';
// group media queries
import gruopCssMediaQueries from 'gulp-group-css-media-queries';



const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild, gruopCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isBuild, webpcss({
                webpcss: ".webp",
                noWebpClass: ".no-webp"
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild, autoprefixer({
                grid: true,
                overrideBrowserlist: ['last 3 versions'],
                cascade: true
            })
        ))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(
            app.isBuild, cleanCss()
        ))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}