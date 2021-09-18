import dynamic from "next/dynamic"
import MainLayout from "./MainLayout"

export const MainLayoutDynamic = dynamic(
  () => import("./MainLayout" /* webpackChunkName: "MainLayout" */),
  { ssr: false }
) as typeof MainLayout
