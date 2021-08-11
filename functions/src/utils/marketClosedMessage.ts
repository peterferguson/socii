import { singleLineTemplateString } from "./singleLineTemplateString";

const marketClosedMessage = async (assetRef) => {
  const assetData = await (await assetRef.get()).data();
  return {
    user_id: "socii",
    text: singleLineTemplateString`
        Sorry the ${assetData.exchange} is not currently open!
        `,
  };
};
