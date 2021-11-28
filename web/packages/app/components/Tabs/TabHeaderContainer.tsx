import React from "react"
import { CenteredRow } from "app/components/Centered"
import tw from "app/lib/tailwind"

export const TabHeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <CenteredRow style={tw`bg-gray-300/20 p-1 my-2 rounded-2xl`}>
      {children}
    </CenteredRow>
  )
}
