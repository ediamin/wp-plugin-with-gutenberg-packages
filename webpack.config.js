const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const plugins = [
    new MiniCssExtractPlugin( {
        filename: '../css/[name].css',
    } ),

    ...defaultConfig.plugins,
];

module.exports = {
    ...defaultConfig,

    plugins,

    module: {
        ...defaultConfig.module,

        rules: [
            ...defaultConfig.module.rules,

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
};
