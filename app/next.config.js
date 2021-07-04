const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

module.exports = withPWA(
  withBundleAnalyzer({
    images: {
      domains: ["lh6.googleusercontent.com", "lh3.googleusercontent.com"],
    },
    reactStrictMode: true,
    purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
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
    future: { webpack5: true },
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
      register: true,
      sw: "sw.js",
      runtimeCaching,
    },
  })
)
