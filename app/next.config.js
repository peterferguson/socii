const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')


module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ["@svgr/webpack"],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
      }
    )
    config.plugins.push(new DuplicatePackageCheckerPlugin())

    return config
  },
})
