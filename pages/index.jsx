import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-2 bg-gray-50 z-2">
        <div className="grid-rows-4">
          <div className="flex jusitfy-center text-7xl pt-32 px-4 font-poppins">
            Invest Together.
          </div>
          <div className="flex jusitfy-center text-4xl pt-4 px-4 font-poppins">
            Secure Your Financial
          </div>
          <div className="flex jusitfy-center text-4xl pb-4 px-4 font-poppins">
            Future With Friends.
          </div>
          <div>
            <button className="btn" onClick={() => router.push("/enter")}>
              Invest Now
            </button>
          </div>
        </div>
        <div className="flex bg-gradient-to-r from-green-300 to-brand-light z-0">
          <svg
            className="fill-current text-gray-50 h-full w-32 -ml-16 z-1"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon className="" points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>
    </>
  );
}