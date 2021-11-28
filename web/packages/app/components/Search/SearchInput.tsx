import tw from "app/lib/tailwind"
import { connectSearchBox } from "react-instantsearch-native"
import { TextInput, View } from "react-native"

const SearchBox: React.FC<{
  refine: (text: string) => {}
  currentRefinement?: string
  searchType?: string
}> = ({ currentRefinement, refine, searchType = "stock" }) => {
  const isStockSearch = searchType === "stock"

  //   const debouncedSearch = useCallback(
  //     debounce(text => refine(text), 200),
  //     []
  //   )

  return (
    <View style={tw`p-2 my-2 justify-center bg-gray-100 rounded-md`}>
      <TextInput
        onChangeText={text => refine(text)}
        value={isStockSearch ? currentRefinement.toUpperCase() : currentRefinement}
        placeholder={`Search a ${searchType}...`}
        clearButtonMode={"always"}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize={isStockSearch ? "characters" : "none"}
      />
    </View>
  )
}
const ConnectedSearchBox = connectSearchBox(SearchBox)

export default ConnectedSearchBox
