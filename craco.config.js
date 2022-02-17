var webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
      }
      // Issue: https://github.com/webpack/changelog-v5/issues/10
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: ['process'],
        })
      )
      return webpackConfig
    },
  },
}
