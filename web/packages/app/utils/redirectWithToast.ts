import { NextRouter } from "next/router"
import toast from "react-hot-toast"

export const redirectWithToast = (router: NextRouter, path: string) =>
  toast.promise(router.push(path), {
    loading: "redirecting...",
    success: null,
    error: "Redirect Failed",
  })
