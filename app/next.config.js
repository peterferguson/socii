const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withPWA = require("next-pwa")

module.exports = withPWA(
  withBundleAnalyzer({
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

      return config
    },
  })
)
