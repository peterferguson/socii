import { CARD_WIDTH } from "app/components/GroupSummaryCard"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { Text } from "react-native"
import { CardWithButton } from "./CardWithButton"

export const CreateNewGroupCard: React.FC = () => {
  const router = useRouter()
  return (
    <CardWithButton
      height={CARD_WIDTH - 10}
      width={CARD_WIDTH}
      onPress={() => router.push("/groups/new")}
      buttonType="BOTTOM"
      ButtonContent={() => (
        <Text
          style={tw.style(
            `text-center p-4 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`,
            { width: CARD_WIDTH }
          )}
        >
          Invite your friends ✌
        </Text>
      )}
    >
      <Text style={tw`text-xl font-poppins-600`}>Want to create a</Text>
      <Text style={tw`text-xl font-poppins-600`}>new group?</Text>
      <Text style={tw`text-3xl`}>👇 </Text>
    </CardWithButton>
  )
}
