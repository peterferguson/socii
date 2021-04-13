import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
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
    </>
  );
}
