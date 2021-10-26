module.exports = function (api) {
  api.cache(true)

  return {
    babelrcRoots: [".", "./packages/*"],
    presets: ["@expo/next-adapter/babel", "module:metro-react-native-babel-preset"],
    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".web.js",
            ".web.tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          root: ["."],
          alias: {
            "@lib/*": "packages/app/lib/*",
            "@firebase/*": "packages/app/lib/firebase/*",
            "@hooks/*": "packages/app/hooks/*",
            "@models/*": "packages/app/models/*",
            "@navigation/*": "packages/app/navigation/*",
            "@components/*": "packages/app/components/*",
            "@utils/*": "packages/app/utils/*",
            "@pages/*": "packages/app/pages/*",
          },
        },
      ],
    ],
    overrides: [
      {
        test: "./node_modules/react-native-reanimated/*",
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
      {
        test: "./node_modules/@expo/vector-icons/*",
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    ],
  }
}
