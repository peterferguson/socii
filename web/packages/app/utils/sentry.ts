// ! taken from rainbow https://github.com/rainbow-me/rainbow/blob/7ae89dbab33b007aace315497929e3a2c674cc59/src/utils/sentry.js
import { addBreadcrumb, Severity } from "@sentry/react-native"

const addInfoBreadcrumb = message =>
  addBreadcrumb({
    level: Severity.Info,
    message,
  })

const addDataBreadcrumb = (message, data) =>
  addBreadcrumb({
    data,
    level: Severity.Info,
    message,
  })

const addNavBreadcrumb = (prevRoute, nextRoute, data) =>
  addBreadcrumb({
    data,
    level: Severity.Info,
    message: `From ${prevRoute} to ${nextRoute}`,
  })

export default {
  addDataBreadcrumb,
  addInfoBreadcrumb,
  addNavBreadcrumb,
}
