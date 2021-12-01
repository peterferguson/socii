require("dotenv").config({ path: "./.env.dev" })

const STAGE = process.env.STAGE

const envConfig = {
  development: { scheme: "app.socii.development" },
  staging: { scheme: "app.socii.staging" },
  production: { scheme: "app.socii" },
}

const config = envConfig[STAGE || "development"]

export default {
  name: "socii",
  description: "Invest With Friends",
  slug: "socii-development",
  scheme: "socii",
  owner: "socii",
  icon: "./assets/icon.png",
  version: "0.0.1",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#37373d",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#37373d",
    },
    googleServicesFile: "./google-services.json",
    permissions: ["NOTIFICATIONS"],
    useNextNotificationsApi: true,
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
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientId: process.env.FIREBASE_CLIENT_ID,
    },
    algolia: {
      algoliaId: process.env.NEXT_PUBLIC_ALGOLIA_ID,
      algoliaSearchKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    },
    stream: {
      id: process.env.NEXT_PUBLIC_STREAM_API_ID,
      key: process.env.NEXT_PUBLIC_STREAM_API_KEY,
      secret: process.env.STREAM_API_SECRET,
    },
    alpaca: {
      alpacaKey: process.env.ALPACA_KEY,
      alpacaSecret: process.env.ALPACA_SECRET,
      testAccount: process.env.ALPACA_TEST_ACCOUNT,
      firmAccountAch: process.env.ALPACA_FIRM_ACCOUNT_ACH,
      firmAccount: process.env.ALPACA_FIRM_ACCOUNT,
    },
    iex: {
      token: process.env.IEX_TOKEN,
    },
    notion: {
      notionSecret: process.env.NOTION_SECRET,
      notionInviteeDb: process.env.NOTION_INVITEE_DB,
    },
    quirrel: {
      baseUrl: process.env.QUIRREL_BASE_URL,
      encryptionSecret: process.env.QUIRREL_ENCRYPTION_SECRET,
      token: process.env.QUIRREL_TOKEN,
    },
    rapidApi: {
      rapidApiNewsUrl: process.env.NEXT_PUBLIC_RAPID_API_NEWS_URL,
      rapidApiNewsKey: process.env.NEXT_PUBLIC_RAPID_API_NEWS_KEY,
    },
    LOCAL_DEVELOPMENT: process.env.LOCAL_DEVELOPMENT,
    STAGE: process.env.STAGE,
  },
  plugins: ["sentry-expo"],
}
