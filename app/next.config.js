const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withImages = require("next-images")
const withPWA = require("next-pwa")
// const nodeExternals = require("webpack-node-externals")

module.exports = withPWA(
  withImages(
    withBundleAnalyzer({
      images: {
        domains: [
          "storage.googleapis.com",
          "lh6.googleusercontent.com",
          "lh3.googleusercontent.com",
        ],
      },
      purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
        register: true,
        sw: "sw.js",
        buildExcludes: [/chunks\/images\/.*$/, /static\/image\/node_modules\/.*$/],
      },
      reactStrictMode: true,
      webpack: (config, { isServer }) => {
        // config.externalsPresets = { node: true } // in order to ignore built-in modules like path, fs, etc.
        // config.externals = [nodeExternals()] // in order to ignore all modules in node_modules folder
        config.module.rules.push({
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve("url-loader"),
        })

        return config
      },
    })
  )
)
