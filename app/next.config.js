const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withPWA = require("next-pwa")

module.exports = withPWA(
  withBundleAnalyzer({
    images: {
      domains: ["lh6.googleusercontent.com", "lh3.googleusercontent.com"],
    },
    purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
      register: true,
      sw: "sw.js",
    },
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve("url-loader"),
      })

      return config
    },
  })
)
