import AttachmentCardContainer from "./AttachmentCardContainer"
import LogoPriceCardHeader from "../LogoPriceCardHeader"

interface IAttachmentCardWithLogoProps {
  assetSymbol: string
  isin: string
  children: React.ReactNode
  cost?: number
  purchasePrice?: number
  logoCardStyle?: any
  showChange?: boolean
}

const AttachmentCardWithLogo = ({
  isin,
  assetSymbol,
  children,
  cost,
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
        purchasePrice={purchasePrice}
        style={logoCardStyle}
        showChange={showChange}
      />
      {children}
    </AttachmentCardContainer>
  )
}

export default AttachmentCardWithLogo
