// webpack.mix.js
// Sept 25, 2023 Shrinkray

const mix = require('laravel-mix');

mix
    // .disableNotifications()
    .sass('scss/kks.scss', 'dist')
    .js(['js/kks.js', 'js/motopress.js', 'js/scrolltop.js'], 'dist/kks.js');
