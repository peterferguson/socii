import { auth } from "@lib/firebase/server/firebase-admin"
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

export const withCORS = (handler) => async (req, res) => {
  await cors(req, res)
  return handler(req, res)
}

// Verify the firebase auth token on the server-side (in vercel functions)
export const withAuth = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) res.status(401).end("Not authenticated. No Auth header")
  const token = authHeader?.split(" ")?.pop()
  if (!token) res.status(401).end("Not authenticated. No token passed")

  let decodedToken
  try {
    decodedToken = await auth.verifyIdToken(token)
    if (!decodedToken || !decodedToken.uid)
      return res.status(401).end("Not authenticated")
    req.token = token
    req.decodedToken = decodedToken.uid
  } catch (error) {
    console.log(error.errorInfo)
    const errorCode = error.errorInfo.code
    error.status = 401
    if (errorCode === "auth/internal-error") error.status = 500

    //TODO handlle firebase admin errors in more detail
    return res.status(error.status).json({ error: errorCode })
  }

  return handler(req, res)
}
