// postcss.config.js

const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        postcssPresetEnv({
            features: {
                'nesting-rules': true,
                'has-pseudo-class': true,
                'is-pseudo-class': true,
            },
        }),
    ],
};