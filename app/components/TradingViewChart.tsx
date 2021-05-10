import TradingViewWidget, {
  Themes,
  TradingViewStockFundamentalsWidget,
} from "react-tradingview-widget";
import { useWindowSize } from "@lib/hooks";

export default function TradingViewChart({ tickerSymbol, market = "NASDAQ" }) {
  const tradingViewSymbol = `${market}:${tickerSymbol}`;
  const [width, height] = useWindowSize();
  return (
    <TradingViewWidget
      symbol={tradingViewSymbol}
      interval="W"
      theme={Themes.LIGHT}
      locale="en"
      allow_symbol_change={false}
      height={height * 0.7}
      width={width * 0.9}
      // autosize={true}
    />
  );
}
export function TradingViewStockFundamentals({
  tickerSymbol,
  market = "NASDAQ",
}) {
  const tradingViewSymbol = `${market}:${tickerSymbol}`;
  // const [width, height] = useWindowSize();
  return (
    <TradingViewStockFundamentalsWidget
      symbol={tradingViewSymbol}
      // colorTheme={Themes.LIGHT}
      // isTransparent={true}
      // displayMode={DisplayModes.ADAPTIVE}
      // height={height * 0.7}
      // width={width * 0.9}
    />
  );
}
