const STAGE = process.env.STAGE
const NEXT_PUBLIC_FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

const envConfig = {
  development: {
    scheme: "com.example.development",
    icon: "./assets/icon.development.png",
    backgroundColor: "#FF0000",
  },
  staging: {
    scheme: "com.example.staging",
    icon: "./assets/icon.staging.png",
    backgroundColor: "#8000FF",
  },
  production: {
    scheme: "com.example",
    icon: "./assets/icon.png",
    backgroundColor: "#1610FF",
  },
}

const config = envConfig[STAGE || "development"]

export default {
  name: "socii",
  description: "Invest With Friends",
  slug: "socii",
  scheme: "socii",
  owner: "socii",
  icon: config.icon,
  version: "0.0.1",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  ios: {
    bundleIdentifier: config.scheme,
    supportsTablet: true,
  },
  android: {
    package: config.scheme,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: config.backgroundColor,
    },
    jsEngine: "hermes",
  },
  androidNavigationBar: {
    barStyle: "dark-content",
    backgroundColor: "#FFFFFF",
  },
  assetBundlePatterns: ["**/*"],
  orientation: "portrait",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {},
      },
    ],
  },
  extra: {
    STAGE: process.env.STAGE,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  },
  plugins: ["sentry-expo"],
}
