import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useWindowSize } from "@lib/hooks";

export default function TradingViewChart(props){
    const tradingViewTicker = `NASDAQ:${props.tickerSymbol}`;
    const [width, height] = useWindowSize();
    return (
        <TradingViewWidget
        symbol={tradingViewTicker}
        interval="W"
        theme={Themes.DARK}
        locale="en"
        allow_symbol_change={false}
        height={height*0.7}
        width={width*0.9}
        // autosize={true}
      />
    )
}