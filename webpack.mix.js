// webpack.mix.js
// Sept 25, 2023 Shrinkray

const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

mix
    // .disableNotifications()
    // Keep url() verbatim so paths stay relative to dist/koolkatscience.css — WordPress is not hosted at /
    .options({
        processCssUrls: false,
        postCss: [
            require('postcss-preset-env')({
                stage: 0,
                features: {
                    'nesting-rules': true,
                },
            }),
        ],
    })
    .sass('scss/koolkatscience.scss', 'dist')
    // Header logo: edit `images/kks-katz-logo.svg` (do not copy from wh-logo — build used to overwrite it).
    .js(['js/koolkatscience.js', 'js/motopress.js', 'js/scrolltop.js'], 'dist/koolkatscience.js');

mix.webpackConfig({
    stats: 'normal', // verbose, normal, minimal, none
}).webpackConfig({
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['dist/koolkatscience.css', 'dist/koolkatscience.js'],
        }),
    ],
});

// Work around webpackbar/ProgressPlugin options schema mismatch in our toolchain.
// (webpackbar extends ProgressPlugin and overwrites `this.options` with keys like
// `name`, `color`, `reporters`, which webpack 5 rejects.)
mix.override(webpackConfig => {
    webpackConfig.plugins = (webpackConfig.plugins || []).filter(
        plugin => plugin?.constructor?.name !== 'WebpackBarPlugin',
    );
});
