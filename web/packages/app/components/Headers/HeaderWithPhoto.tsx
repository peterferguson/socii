import { CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { UserPhoto } from "app/components/UserPhoto"
import tw from "app/lib/tailwind"
import { useNavigation } from "@react-navigation/native"

const HeaderWithPhoto = ({ title }) => {
  const { canGoBack } = useNavigation()
  console.log("canGoBack", canGoBack())
  return (
    <CenteredRow style={tw`${canGoBack() ? "w-2/3" : "w-full"}`}>
      <HeaderTitle headerTitle={title} textStyle={tw`text-center`} />
      <UserPhoto containerStyle={tw`absolute right-4`} />
    </CenteredRow>
  )
}

export default HeaderWithPhoto
