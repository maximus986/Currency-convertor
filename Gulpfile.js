var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: false,
            proxies: [{
                source: '/kursna-lista',
                target: 'https://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista'
            }]
        }));
});