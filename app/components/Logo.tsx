import Image from "next/image"
import Link from "next/link"
import React from "react"

interface ILogo {
  className?: string
}

export default function Logo({ className }: ILogo) {
  return (
    <Link href="/">
      <a className={`${className ?? ""} font-primary mx-4 flex flex-row`}>
        <span className="-mr-0.5">s</span>
        <Socii className="mt-[0.25rem]" />
        <span className="-ml-0.5">cii</span>
      </a>
    </Link>
  )
}

export const LogoAlone = ({ className }) => (
  <Link href="/">
    <a>
      <Socii className={className} />
    </a>
  </Link>
)

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
{
  /* <div className="relative flex items-center justify-center border-white border-8 rounded-full w-32 h-32">
<div className="absolute bg-gray-100 -bottom-3 left-3 rounded-full h-8 w-8">
  <div className="border-4 border-white rounded-full h-6 w-6"></div>
</div>

<div className="border-8 border-white rounded-full w-16 h-16"></div>
<div className="absolute -top-1 right-1 bg-gray-100 rounded-full h-8 w-8">
  <div className="relative border-4 border-white rounded-full h-6 w-6 top-2 left-2"></div>
</div>
</div> */
}

function Socii(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4000 4000"
      height="1em"
      width="1em"
      {...props}
    >
      <defs>
        <linearGradient
          id="prefix__a"
          spreadMethod="pad"
          gradientTransform="matrix(1219.2469 0 0 -1219.2469 859.643 1468.745)"
          gradientUnits="userSpaceOnUse"
          y2={0}
          x2={1}
          y1={0}
          x1={0}
        >
          <stop offset={0} stopColor="#29b7c3" />
          <stop offset={1} stopColor="#42b59d" />
        </linearGradient>
        <linearGradient
          id="prefix__b"
          spreadMethod="pad"
          gradientTransform="matrix(1524.3737 0 0 -1524.3737 385.617 1548.64)"
          gradientUnits="userSpaceOnUse"
          y2={0}
          x2={1}
          y1={0}
          x1={0}
        >
          <stop offset={0} stopColor="#29b7c3" />
          <stop offset={1} stopColor="#42b59d" />
        </linearGradient>
        <linearGradient
          id="prefix__c"
          spreadMethod="pad"
          gradientTransform="matrix(1524.533 0 0 -1524.533 1028.835 1388.85)"
          gradientUnits="userSpaceOnUse"
          y2={0}
          x2={1}
          y1={0}
          x1={0}
        >
          <stop offset={0} stopColor="#29b7c3" />
          <stop offset={1} stopColor="#42b59d" />
        </linearGradient>
      </defs>
      <path
        d="M1038.262 1899.928c-115.177-115.179-178.619-268.304-178.619-431.195 0-162.868 63.442-315.991 178.619-431.169 114.971-114.96 268.096-178.279 431.169-178.279 163.074 0 316.187 63.319 431.158 178.279 237.734 237.745 237.734 624.617 0 862.364-114.984 114.959-268.109 178.277-431.171 178.277-163.06 0-316.174-63.318-431.156-178.277m103.364-758.964c-87.578 87.527-135.8 203.941-135.8 327.769 0 123.852 48.222 240.266 135.8 327.793 87.431 87.431 203.843 135.581 327.792 135.581 123.963 0 240.377-48.15 327.806-135.581 87.432-87.405 135.571-203.819 135.571-327.769 0-123.973-48.139-240.387-135.571-327.793-87.429-87.432-203.843-135.581-327.806-135.581-123.96 0-240.374 48.149-327.792 135.581"
        fill="url(#prefix__a)"
        transform="matrix(1.33333 0 0 -1.33333 0 4000)"
      />
      <path
        d="M702.351 2235.813C339.116 1872.568 281.381 1298.135 565.06 869.97l7.853-11.848-6.254-12.772c-39.329-80.355-23.409-176.678 39.632-239.733 39.404-39.377 91.866-61.09 147.747-61.09 55.88 0 108.356 21.69 147.746 61.09 81.471 81.471 81.471 214.022 0 295.493-39.245 39.255-91.586 60.87-147.382 60.87a212.12 212.12 0 01-50.779-6.176l-17.351-4.29-9.572 15.095c-233.01 367.753-178.752 858.052 129.025 1165.83 176.873 176.874 412.439 274.287 663.282 274.287 124.034 0 244.348-23.699 358.049-70.491 19.494 46.333 47.205 87.649 82.621 123.053.107.095.218.193.313.314-137.882 61.018-289.589 93.151-441.152 93.151-289.906 0-562.111-112.561-766.487-316.94M667.175 666.515c-23.176 23.166-35.937 54.013-35.937 86.848 0 32.86 12.761 63.707 35.937 86.875 23.18 23.166 54.027 35.935 86.863 35.935 32.846 0 63.696-12.769 86.872-35.935 47.897-47.885 47.897-125.841 0-173.723-23.165-23.191-54.026-35.938-86.872-35.938-32.836 0-63.696 12.747-86.863 35.938"
        fill="url(#prefix__b)"
        transform="matrix(1.33333 0 0 -1.33333 0 4000)"
      />
      <path
        d="M2037.055 2331.873c-39.403-39.403-61.091-91.866-61.091-147.747 0-55.88 21.688-108.343 61.091-147.746 39.245-39.256 91.599-60.871 147.419-60.871a212.56 212.56 0 0150.695 6.154l17.35 4.289 9.559-15.096c233.021-367.754 178.788-858.051-128.966-1165.803-176.874-176.874-412.437-274.265-663.28-274.265-124.034 0-244.349 23.699-358.049 70.469-19.494-46.334-47.218-87.65-82.62-123.055-.108-.096-.219-.216-.328-.315 137.883-61.018 289.59-93.149 441.142-93.149h.024c289.869 0 562.112 112.56 766.487 316.939 363.368 363.366 421.162 937.894 137.411 1366.085l-7.839 11.849 6.228 12.748c39.195 80.305 23.227 176.556-39.741 239.514-39.404 39.377-91.866 61.09-147.747 61.09-55.879 0-108.355-21.689-147.745-61.09m60.871-234.619c-47.894 47.883-47.894 125.838 0 173.721 23.169 23.191 54.028 35.938 86.874 35.938 32.837 0 63.697-12.747 86.863-35.938 23.177-23.166 35.935-54.013 35.935-86.872 0-32.836-12.758-63.683-35.935-86.849-23.18-23.166-54.026-35.937-86.863-35.937-32.846 0-63.695 12.771-86.874 35.937"
        fill="url(#prefix__c)"
        transform="matrix(1.33333 0 0 -1.33333 0 4000)"
      />
    </svg>
  )
}

// export default Socii
