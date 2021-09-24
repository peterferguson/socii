const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const path = require("path")
const withImages = require("next-images")
const withPWA = require("next-pwa")
const withTM = require("next-transpile-modules")(["@socii/shared"])

// const nodeExternals = require("webpack-node-externals")

module.exports = withPWA(
  withImages(
    withTM(
      withBundleAnalyzer({
        exclude: path.resolve(__dirname, "public/icons/"),
        images: {
          disableStaticImages: true,
          domains: [
            "storage.googleapis.com",
            "lh6.googleusercontent.com",
            "lh3.googleusercontent.com",
            "rapidapi.usearch.com",
          ],
        },
        purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
          register: false,
          skipWaiting: false,
          sw: "sw.js",
          buildExcludes: [/chunks\/images\/.*$/, /static\/image\/node_modules\/.*$/],
        },
        reactStrictMode: true,
        webpack: (config, { isServer }) => {
          // config.externalsPresets = { node: true } // in order to ignore built-in modules like path, fs, etc.
          // config.externals = [nodeExternals()] // in order to ignore all modules in node_modules folder
          config.module.rules.push({
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
          })

          config.module.rules.push({
            test: /\.svg$/,
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  icon: true,
                  dimensions: false,
                  // typescript: true,
                  // svgo: true,
                },
              },
            ],
          })

          return config
        },
      })
    )
  )
)
