// webpack.mix.js
// Sept 25, 2023 Shrinkray

const mix = require('laravel-mix');

mix
    // .disableNotifications()
    .sass('scss/kks.scss', 'dist')
    .postCss('dist/kks.css', 'dist', [
        require('postcss-preset-env')({
            stage: 0,
            features: {
                'nesting-rules': true,
            },
        }),
    ])
    .js([ 'js/kks.js', 'js/motopress.js', 'js/scrolltop.js' ], 'dist/kks.js');

    mix.webpackConfig({
        stats: 'verbose',
    }).webpackConfig({
        plugins: [
            new CleanWebpackPlugin({
                dry: true,
                verbose: true,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: true,
                cleanOnceBeforeBuildPatterns: ['dist/*'],
            }),
        ],
    });
