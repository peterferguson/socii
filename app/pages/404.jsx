import Link from 'next/link'
import React from 'react'

export default function Custom404() {
  return (
    <main>
      <div className="flex-direction: column">
        <div className="flex justify-center pt-4 pb-2 text-5xl font-bold font-poppins">
          404 ...
        </div>
        <div className="flex justify-center text-3xl font-bold font-poppins">
          <iframe
            src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
            width="480"
            height="362"
            frameBorder="0"
            allowFullScreen
            className="flex justify-center p-4"
          ></iframe>
        </div>
        <div className="flex justify-center p-2 text-3xl font-bold font-poppins">
          Page not found
        </div>
        <div className="flex justify-center p-4">
          <Link href="/">
            <button className="btn">Go home</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
