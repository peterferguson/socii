import { useGoogleSignInPopUp } from "app/hooks/useGoogleSignInPopUp"
import React from "react"
import { Pressable, Text } from "react-native"
import tw from "../lib/tailwind"
import { CenteredRow } from "./Centered"
import Google from "./Logos/Google"

export enum GoogleButtonType {
  /**
   * "Sign in with Google"
   */
  SIGN_IN = 0,
  /**
   * "Continue with Google"
   */
  CONTINUE = 1,
  /**
   * "Sign up with Google"
   */
  SIGN_UP = 2,
}

const buttonTypeToText = (buttonType: GoogleButtonType) => {
  switch (buttonType) {
    case GoogleButtonType.SIGN_IN:
      return "Sign in with Google"
    case GoogleButtonType.CONTINUE:
      return "Continue with Google"
    case GoogleButtonType.SIGN_UP:
      return "Sign up with Google"
  }
}

export const LoginWithGoogle: React.FC<{ buttonType: GoogleButtonType }> = ({
  buttonType,
}) => {
  const signinWithGoogle = useGoogleSignInPopUp()

  return (
    <Pressable
      style={tw.style(`w-11/12 p-0.5 px-6 border border-black rounded-full`, {
        borderWidth: 0.5,
        width: 250,
        height: 50,
      })}
      onPress={() => signinWithGoogle()}
    >
      <CenteredRow style={tw`py-2 px-2`}>
        <Google {...tw`mr-2 w-3 h-3"`} />
        <Text style={tw`text-lg font-poppins-500 text-brand-black`}>
          {buttonTypeToText(buttonType)}
        </Text>
      </CenteredRow>
    </Pressable>
  )
}
