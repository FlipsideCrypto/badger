const path = require('path');
const Dotenv = require('dotenv-webpack');
const { ProvidePlugin } = require('webpack');

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
        },
        plugins: [
            new Dotenv({
              path: '../.env',
              safe: true,
              ignoreStub: true,
            }),
            new ProvidePlugin({
                Buffer: ['buffer', 'Buffer']
            })
        ],
        configure: {
            ignoreWarnings: [
              function ignoreSourcemapsloaderWarnings(warning) {
                return (
                  warning.module &&
                  warning.module.resource.includes("node_modules") &&
                  warning.details &&
                  warning.details.includes("source-map-loader")
                );
              },
            ],
            resolve: {
                fallback: {
                    buffer: require.resolve('buffer')
                }
            }
        },
    }
}