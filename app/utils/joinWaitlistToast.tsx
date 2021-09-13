import React, { useCallback } from "react"
import toast from "react-hot-toast"
import { tw } from "@utils/tw"
import { joinWaitlist } from "@utils/joinWaitlist"
import { HiX } from "react-icons/hi"

export const joinWaitlistToast = (email: string) =>
