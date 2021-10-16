import { ChartDot as OriginalChartDot } from "@rainbow-me/animated-charts"
import React from "react"

export default function ChartDot({ style, size = 10 }) {
  return <OriginalChartDot style={style} size={size} />
}
