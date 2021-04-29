import { pnlBackgroundColor } from "@utils/helper";

export default function SmallAssetkCard(props) {
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pl-8 pt-4 bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-40 sm:w-52">
        <div className="items-center justify-center sm:flex">
          <img
            className="shadow-lg rounded-full h-auto w-16 mx-auto"
            src={props.logoUrl}
            alt={`${props.tickerSymbol} logo`}
          />
          <div className="p-2 h-auto w-auto text-center">
            <div
              className={`${pnlBackgroundColor(
                props.dailyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold w-full text-center inline-block`}
            >
              D: {props.dailyPctChange.toFixed(2)}%
            </div>
            <div
              className={`${pnlBackgroundColor(
                props.monthlyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold w-full text-center hidden sm:inline-block`}
            >
              M: {props.monthlyPctChange.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="ml-2 text-gray-600 uppercase text-xs w-full inline-block font-semibold tracking-wider overflow-ellipsis overflow-hidden">
          {props.tickerSymbol} &bull; {props.shortName}
        </div>
      </div>
    </div>
  );
}