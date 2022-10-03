const path = require('path');

module.exports = {
    webpack: {
        eslint: { 
            enable: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"]
                }
            ]
        },
        ignoreWarnings: [/Failed to parse source map/],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@static': path.resolve(__dirname, 'src/static/'),
            '@style': path.resolve(__dirname, 'src/style/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@abis': path.resolve(__dirname, 'src/abis/')
        }
    }
}