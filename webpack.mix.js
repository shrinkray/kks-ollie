// webpack.mix.js
// Sept 25, 2023 Shrinkray

const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        stats: 'normal',  // verbose, normal, minimal, none
    }).webpackConfig({
        plugins: [
            new CleanWebpackPlugin({
                dry: false,
                verbose: false,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: ['dist/kks.css', 'dist/kks.js'],
            }),
        ],
    });
