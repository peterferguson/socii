import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { useWindowSize } from '@lib/hooks'

import React, { useEffect, useRef } from 'react'
import router from 'next/router'

const marketMapping = {
  NCM: 'NASDAQ',
  NMS: 'NASDAQ',
  NYQ: 'NYSE',
}

export default function TradingViewChart({ tickerSymbol, exchange = 'NASDAQ' }) {
  const tradingViewSymbol = `${exchange}:${tickerSymbol}`
  const [width, height] = useWindowSize()
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
  )
}

export function TradingViewMarketOverview() {
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      container_id: 'tv-medium-widget',
      symbols: [
        ['Bitcoin', 'BITMEX:XBTUSD|1m'],
        ['Ethereum', 'BITMEX:ETHUSD|1m'],
      ],
      greyText: 'Quotes by',
      gridLineColor: 'rgba(182, 182, 182, 0.65)',
      fontColor: 'rgba(0, 0, 0, 1)',
      underLineColor: 'rgba(60, 120, 216, 1)',
      trendLineColor: 'rgba(60, 120, 216, 1)',
      width: '100%',
      height: '100%',
      locale: 'en',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

export function TradingViewStockTechnicalAnalysisWidget({
  tickerSymbol,
  exchange = 'NASDAQ',
  className = '',
}) {
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: 425,
      isTransparent: false,
      height: 450,
      symbol: `${exchange}:${tickerSymbol}`,
      showIntervalTabs: true,
      locale: 'uk',
      colorTheme: 'light',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          href={`https://uk.tradingview.com/symbols/${exchange}-${tickerSymbol}/technicals/`}
          rel="noopener"
          target="_blank"
        >
          <span className="blue-text">Technical Analysis for {tickerSymbol}</span>
        </a>{' '}
        by TradingView
      </div>
    </div>
  )
}

export function TradingViewStockTickerQuotes({ className = '' }) {
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'FOREXCOM:SPXUSD',
          title: 'S&P 500',
        },
        {
          proName: 'FOREXCOM:NSXUSD',
          title: 'Nasdaq 100',
        },
        {
          proName: 'CURRENCYCOM:UK100',
          description: 'FTSE 100',
        },
        {
          proName: 'CRYPTOCAP:BTC.D',
          description: 'Bitcoin',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'uk',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

export function TradingViewStockTickerTape({ tickerSymbols, className }) {
  const innerHTML = {
    ...tickerSymbols,
    ...{
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'uk',
    },
  }
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = false
    script.innerHTML = JSON.stringify(innerHTML)
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

export function TradingViewStockFinancials({
  tickerSymbol,
  exchange = 'NASDAQ',
  width = 480,
  height = 650,
  displayMode = 'regular',
  className = '',
}) {
  const tradingViewSymbol = `${exchange}:${tickerSymbol}`
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-financials.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      symbol: tradingViewSymbol,
      colorTheme: 'light',
      isTransparent: false,
      largeChartUrl: '',
      displayMode,
      width,
      height,
      locale: 'uk',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

export function TradingViewStockProfile({
  tickerSymbol,
  exchange = 'NASDAQ',
  width = 480,
  height = 650,
  className = '',
}) {
  const tradingViewSymbol = `${exchange}:${tickerSymbol}`
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      symbol: tradingViewSymbol,
      width,
      height,
      colorTheme: 'light',
      isTransparent: false,
      locale: 'uk',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

export function TradingViewStockPrice({
  tickerSymbol,
  exchange = 'NASDAQ',
  width = 480,
  className = '',
}) {
  const tradingViewSymbol = `${exchange}:${tickerSymbol}`
  const scriptRef = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js'
    script.async = false
    script.innerHTML = JSON.stringify({
      symbol: tradingViewSymbol,
      width,
      colorTheme: 'light',
      isTransparent: false,
      locale: 'uk',
    })
    scriptRef.current.appendChild(script)
  }, [])

  return (
    <div className={`tradingview-widget-container ${className}`} ref={scriptRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}
