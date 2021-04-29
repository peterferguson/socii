import Link from "next/link";


export default function Custom404() {
  return (
    <main>
      <div className="flex-direction: column">
      <div className="pt-4 pb-2 flex justify-center text-5xl font-poppins font-bold">404 ...</div>
      <div className="flex justify-center text-3xl font-poppins font-bold">
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
        className="p-4 flex justify-center"
        ></iframe>
        </div>
      <div className="p-2 flex justify-center text-3xl font-poppins font-bold">Page not found</div>
      <div className="p-4 flex justify-center">
      <Link href="/">
        <button className="btn">
          Go home
        </button>
      </Link>
      </div>
      </div>
    </main>
  );
}
