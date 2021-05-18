import { uncamelCase } from "@utils/helper";
import router from "next/router";

const StockDisplayAttachment = ({attachment, tickerSymbol, exchange, asset}) =>  {
    return (
        <div
        className="cursor-pointer bg-white p-4 rounded-lg shadow-lg"
        onClick={() => router.push(attachment.url)}
      >
        <img
          className="shadow-lg rounded-full h-auto w-14 mx-auto"
          src={attachment.image}
          alt={`${tickerSymbol} logo`}
        />
        <div className="p-1 h-auto w-auto text-center">
          <div
            className={
              "text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
                inline-block font-poppins"
            }
          >
            {name}
            <p className="text-sm text-gray-600">
              ${tickerSymbol} &bull; {exchange}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {asset &&
            Object.keys(asset).map((key) => {
              return (
                <div
                  className="ml-2 mt-2 sm:mt-4 text-brand-light text-xs w-full
                             font-semibold tracking-wider text-left"
                >
                  {uncamelCase(key)} &bull;{" "}
                  <span className="text-tiny font-poppins text-gray-600">
                    {asset[key]}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    )
}

export default StockDisplayAttachment;