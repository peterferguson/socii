interface IInvestButtonProps {
  state: any
  send: (event: string) => void
  logoColor: string
}

export const InvestButton: React.FC<IInvestButtonProps> = ({
  state,
  send,
  logoColor,
}) => {
  return (
    <div
      style={{ backgroundColor: logoColor }}
      className="mx-0 mt-2 mb-0 text-center btn btn-transition rounded-2xl sm:rounded-xl"
      onClick={() => (state.matches("active") ? send("CLOSE") : send("CLICK"))}
    >
      <span className="z-10 w-12 h-4 text-4xl">Invest</span>
    </div>
  )
}
