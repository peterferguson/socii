import React from "react"

export default function LoadingIndicator({ show = true, className = "" }) {
  return show ? <div className={`loader ${className}`}></div> : null
}
