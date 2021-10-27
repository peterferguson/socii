import AttachmentCardContainer from "./AttachmentCardContainer"
import LogoPriceCardHeader from "../LogoPriceCardHeader"
import { Price } from "../../models/Price"

interface IAttachmentCardWithLogoProps {
  assetSymbol: string
  isin: string
  children: React.ReactNode
  cost?: number
  currentPriceData?: Price
  purchasePrice?: number
  logoCardStyle?: any
  showChange?: boolean
}

const AttachmentCardWithLogo = ({
  isin,
  assetSymbol,
  children,
  cost,
  currentPriceData,
  purchasePrice,
  logoCardStyle = {},
  showChange = true,
}: IAttachmentCardWithLogoProps) => {
  return (
    <AttachmentCardContainer>
      <LogoPriceCardHeader
        isin={isin}
        asset={assetSymbol}
        cost={cost}
        currentPriceData={currentPriceData}
        purchasePrice={purchasePrice}
        style={logoCardStyle}
        showChange={showChange}
      />
      {children}
    </AttachmentCardContainer>
  )
}

export default AttachmentCardWithLogo
