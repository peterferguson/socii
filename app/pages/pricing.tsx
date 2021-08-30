const Pricing = () => {
  return (
    <body className="w-full h-full py-16 antialiased font-primary">
      <section className="flex flex-col items-center w-full py-12 lg:flex-row lg:justify-center lg:px-10 space-x-8">
        <article className="w-4/5 px-6 py-10 mb-10 text-center bg-white shadow-lg rounded-2xl lg:w-1/3 text-logo-darkBg">
          <h5
            className="text-base font-bold text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3fba 0,  #3fbaeb 5%, #3fba 95%)",
            }}
          >
            Basic
          </h5>
          <h2 className="flex justify-center pb-4 mt-2 font-bold border-b border-gray-300">
            <span className="text-5xl ">Free</span>
          </h2>
          <ul className="text-sm font-bold">
            {[
              <span key={`single-group`}>
                <p>One group</p>
                <span className="text-gray-400 text-tiniest">3 members limit</span>
              </span>,
              "General Investment Account",
              <span key={`crypto`}>
                <p>Crypto</p>
                <span className="text-gray-400 text-tiny"></span>
              </span>,
              <span key={`fx-rate`}>
                <p>Spot rate + 0.5%</p>
                <span className="text-gray-400 text-tiny">FX Rates</span>
              </span>,
            ].map((item, index) => (
              <li
                key={`free-${index}`}
                className="relative flex items-center justify-center h-16 py-6 border-b border-gray-300"
              >
                <TickThroughCircle
                  withGradient={false}
                  className="absolute text-[rgba(47,231,169,0.82)] left-2"
                />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="w-4/5 px-6 py-10 mb-10 text-center text-white shadow-xl rounded-2xl lg:w-1/3 bg-[#29B7C3]">
          <h5 className="text-base font-bold">Premium</h5>
          <h2 className="flex justify-center pb-4 mt-2 font-bold border-b border-gray-100">
            <span className="mt-3 mr-1 text-3xl">£</span>
            <span className="text-5xl">4.99</span>
            <span className="mt-4 mr-1 text-xl">/mo</span>
          </h2>
          <ul className=" text-sm font-bold">
            {[
              <p key="all-of-basic" className="font-extrabold">
                Everything in basic
              </p>,
              <span key="unlimited-groups">
                <p>Unlimited groups</p>
                <span className="text-tiniest">20 members limit</span>
              </span>,
              "Limit Orders",
              <p key="more-assets">
                Increased Stock & <br /> Crypto Universe
              </p>,
              "Portfolio Auto-Reallocation",
              "Free Deposits & Withdrawals",
              "Stocks and Shares ISA",
            ].map((item, index) => (
              <li
                key={`premium-feature-${index}`}
                className="relative flex items-center justify-center h-16 py-6 border-b border-gray-200"
              >
                <TickThroughCircle
                  withGradient={false}
                  className="absolute text-white left-2"
                />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </body>
  )
}

interface TickThroughCircleProps {
  className?: string
  withGradient?: boolean
  stroke?: string
}

const TickThroughCircle = ({
  className = "",
  withGradient = true,
  stroke = "",
}: TickThroughCircleProps) => (
  <svg
    className={`w-4 h-4 ${className || ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke ? stroke : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient
        id="a"
        spreadMethod="pad"
        gradientTransform="matrix(1219.2469 0 0 -1219.2469 859.64301 1468.7451)"
        gradientUnits="userSpaceOnUse"
        y2="0"
        x2="1"
        y1="0"
        x1="0"
      >
        <stop offset="0" stopColor="#3fbaeb" />
        <stop offset="1" stopColor="#3fba" />
      </linearGradient>
      <linearGradient
        id="b"
        spreadMethod="pad"
        gradientTransform="matrix(1524.3737 0 0 -1524.3737 385.6167 1548.6399)"
        gradientUnits="userSpaceOnUse"
        y2="0"
        x2="1"
        y1="0"
        x1="0"
      >
        {" "}
        <stop offset="0" stopColor="#3fbaeb" />
        <stop offset="1" stopColor="#3fba" />
      </linearGradient>
    </defs>
    <path
      stroke={withGradient && !stroke ? "url(#a)" : "currentColor"}
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
    />
    <polyline
      stroke={withGradient && !stroke ? "url(#b)" : "currentColor"}
      points="22 4 12 14.01 9 11.01"
    />
  </svg>
)

export default Pricing
