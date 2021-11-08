import { useState, useEffect } from "react"
import { View } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import { signInWithApple } from "app/lib/firebase/authentication"

const LoginWithApple = () => {
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false)

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable)
  }, [])

  return isAppleLoginAvailable ? (
    <View style={{ alignItems: "center" }}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 250, height: 50 }}
        onPress={signInWithApple}
      />
    </View>
  ) : null
}

export default LoginWithApple
