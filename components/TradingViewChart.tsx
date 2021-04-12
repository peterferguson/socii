import TradingViewWidget, { Themes } from 'react-tradingview-widget';

export default function TradingViewChart(props){
    const tradingViewTicker = `NASDAQ:${props.tickerSymbol}`;
    return (
        <TradingViewWidget
        symbol={tradingViewTicker}
        interval="W"
        theme={Themes.DARK}
        locale="en"
        allow_symbol_change={false}
        autosize={true}
      />
    )
}