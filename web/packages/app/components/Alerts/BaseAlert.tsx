// ! modified from rainbow https://github.com/rainbow-me/rainbow/blob/733373ff33975fc0d2e2ad00db6d3b868da4ff4b/src/components/alerts/BaseAlert.js
import PropTypes from "prop-types"
import { Alert } from "react-native"

interface AlertButton {
  text: string
  onPress?: () => {}
  style?: "cancel" | "default" | "destructive"
}

interface BaseAlertProps {
  alertType: "alert" | "prompt" | "confirm"
  buttons?: AlertButton[]
  callback?: () => {}
  message?: string
  title: string
  type?: string
}

const BaseAlert: React.FC<BaseAlertProps> = ({
  alertType,
  buttons,
  callback,
  message,
  title,
  type,
}) => Alert[alertType](title, message, buttons || callback, type)

export default BaseAlert
