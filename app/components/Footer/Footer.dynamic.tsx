import dynamic from "next/dynamic"
import Footer from "./Footer"

export const FooterDynamic = dynamic(
  () => import("./Footer" /* webpackChunkName: "Footer" */),
  { ssr: false }
) as typeof Footer
