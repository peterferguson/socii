import * as AppleAuthentication from "expo-apple-authentication"
import React from "react"
import tw from "../lib/tailwind"
import { CenteredColumn } from "./Centered"
import LoginWithApple from "./LoginWithApple"
import { GoogleButtonType, LoginWithGoogle } from "./LoginWithGoogle"
import VerticalSpacer from "./VerticalSpacer"

export enum LoginOptionsButtonType {
  /**
   * "Sign in with Google / Apple"
   */
  SIGN_IN = 0,
  /**
   * "Continue with Google / Apple"
   */
  CONTINUE = 1,
  /**
   * "Sign up with Google / Apple"
   */
  SIGN_UP = 2,
}

const LoginOptionsButtonMapping = (buttonType: LoginOptionsButtonType) => {
  switch (buttonType) {
    case LoginOptionsButtonType.SIGN_IN:
      return {
        google: GoogleButtonType.SIGN_IN,
        apple: AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN,
      }
    case LoginOptionsButtonType.CONTINUE:
      return {
        google: GoogleButtonType.CONTINUE,
        apple: AppleAuthentication.AppleAuthenticationButtonType.CONTINUE,
      }
    case LoginOptionsButtonType.SIGN_UP:
      return {
        google: GoogleButtonType.SIGN_UP,
        apple: AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP,
      }
  }
}

export const LoginOptions: React.FC<{ buttonType: LoginOptionsButtonType }> = ({
  buttonType,
}) => (
  <CenteredColumn style={tw`mx-auto`}>
    <LoginWithGoogle buttonType={LoginOptionsButtonMapping(buttonType)?.google} />
    <VerticalSpacer height={12} />
    {LoginWithApple && (
      <LoginWithApple buttonType={LoginOptionsButtonMapping(buttonType)?.apple} />
    )}
  </CenteredColumn>
)
