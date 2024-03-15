import fileinclude from 'gulp-file-include';
// plugin for good img quality
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
// to avoid caching issues
import versionNumber from 'gulp-version-number';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(app.plugins.if(
            app.isBuild,
            webpHtmlNosvg())
        )
        .pipe(app.plugins.if(
            app.isBuild,
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': ['css', 'js']
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}