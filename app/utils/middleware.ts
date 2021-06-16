import Cors from "cors"

const allowedOrigins = [
  /\.socii\.app$/,
  /\.investsocial\.app$/,
  /\.investsocial\.co.uk$/,
  /\.socii.vercel\.app$/,
]

if (process.env.NODE_ENV === "development") allowedOrigins.push(/\.localhost:3000$/)

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

// Initialize the cors middleware
export const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: allowedOrigins,
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
)
