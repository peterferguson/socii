import dynamic from "next/dynamic"
import AuthCheck from "./AuthCheck"

export const AuthCheckDynamic = dynamic(
  () => import("./AuthCheck" /* webpackChunkName: "AuthCheck" */),
  { ssr: false }
) as typeof AuthCheck
