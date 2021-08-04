import Image from "next/image"
import Link from "next/link"
import React from "react"

interface ILogo {
  className?: string
}
interface ILogoImage {
  width?: string
  height?: string
}

export default function Logo({ className }: ILogo) {
  return (
    <>
      <Link href="/">
        <a
          className={`${
            className ?? ""
          } font-primary mx-4 inline-flex items-center justify-center`}
        >
          <span className="-mr-0.5">s</span>
          <span className="mt-[0.425rem]">
            <Image src="/favicons/socii.svg" width="28px" height="28px" />
          </span>
          <span className="-ml-0.5">cii</span>
        </a>
      </Link>
    </>
  )
}

export function LogoAlone({ width = "64px", height = "64px" }: ILogoImage) {
  return (
    <>
      <Link href="/">
        <a>
          <Image src="/favicons/socii.svg" width={width} height={height} />
        </a>
      </Link>
    </>
  )
}

export function InlineLogo({ className }: ILogo) {
  return (
    <>
      <Link href="/">
        <a
          className={`${
            className ?? ""
          } font-primary -my-4 -mx-2 inline-flex items-center justify-center`}
        >
          <Image src="/favicons/socii.svg" width="64px" height="64px" />
          <span>socii</span>
        </a>
      </Link>
    </>
  )
}

export function LogoATop({ className }: ILogo) {
  return (
    <>
      <Link href="/">
        <a
          className={`${
            className ?? ""
          } font-primary -mt-4 flex flex-col items-center justify-center`}
        >
          <Image src="/favicons/socii.svg" width="84px" height="84px" />
          <span className="-mt-2">socii</span>
        </a>
      </Link>
    </>
  )
}

export function LogoInO({ className }: ILogo) {
  return (
    <>
      <Link href="/">
        <a
          className={`${
            className ?? ""
          } font-primary -mt-4 inline-flex items-center justify-center`}
        >
          <span className="-mr-0.5">s</span>
          <span className="mt-[0.425rem]">
            <Image src="/favicons/socii.svg" width="28px" height="28px" />
          </span>
          <span className="-ml-0.5">cii</span>
        </a>
      </Link>
    </>
  )
}

// ! Attempt at creating the logo in tailwind
{/* <div className="relative flex items-center justify-center border-white border-8 rounded-full w-32 h-32">
<div className="absolute bg-gray-100 -bottom-3 left-3 rounded-full h-8 w-8">
  <div className="border-4 border-white rounded-full h-6 w-6"></div>
</div>

<div className="border-8 border-white rounded-full w-16 h-16"></div>
<div className="absolute -top-1 right-1 bg-gray-100 rounded-full h-8 w-8">
  <div className="relative border-4 border-white rounded-full h-6 w-6 top-2 left-2"></div>
</div>
</div> */}