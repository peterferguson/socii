import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex jusitfy-center text-6xl pt-32 px-4 text-green-400">Invest Together.</div>
      <div className="flex jusitfy-center text-4xl pt-4 px-4 text-green-400">Secure Your Financial</div>
      <div className="flex jusitfy-center text-4xl pb-4 px-4 text-green-400">Future With Friends.</div>

      <div>
              <button
                className="flex-1 rounded p-2 m-4 text-white bg-purple-theme hover:bg-purple-400"
                onClick={() => router.push("/enter")}
              >
                <a>Invest Now</a>
              </button>
            </div>
    </>
  );
}
