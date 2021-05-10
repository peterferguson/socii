import DonutChart from "@components/DonutChart";
import Link from "next/link";

export default function PieCard({ className, groupName, data, scaling, radius, text }) {
  return (
    <div className={`w-88 sm:w-full items-center justify-center flex flex-col \
                  bg-white rounded sm:rounded-xl shadow-2xl m-0 sm:m-4 mb-2 sm:mb-4 \
                  ${className}
    `}>
      <Link href={`/groups/${groupName}`}>
        <div className="relative top-2 text-4xl text-brand font-poppins text-center z-10 cursor-pointer">
          {groupName}
        </div>
      </Link>
      <DonutChart
        className="z-0 -mt-8"
        data={data}
        scaling={scaling}
        radius={radius}
        text={text}
      />
    </div>
  );
}

export function PieCardSkeleton({ scaling, radius }) {
  const text = {
    main: (
      <div className="h-4 w-16 mx-auto rounded-sm bg-gray-200 animate-pulse mb-4" />
    ),
    sub: (
      <div className="h-4 w-12 mx-auto rounded-sm bg-gray-200 animate-pulse mb-4" />
    ),
  };
  return (
    <div className="bg-gray-50 rounded-none sm:rounded-xl shadow-2xl m-0 sm:m-4 mb-2 sm:mb-4">
      <div className="text-xl font-poppins text-center pt-4 -mb-8">
        <div className="h-6 w-16 mx-auto rounded-sm bg-gray-200 animate-pulse mb-4" />
      </div>
      <DonutChart
        className="z-0 animate-pulse"
        data={[
          { theta: 1, color: "#E5E7EB" },
          { theta: 2, color: "#E5E7EB" },
        ]}
        scaling={scaling}
        radius={radius}
        skeleton={true}
        text={text}
      />
    </div>
  );
}
