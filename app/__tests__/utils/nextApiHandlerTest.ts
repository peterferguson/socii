import { testApiHandler } from "next-test-api-route-handler"
import { NextApiRequest, NextApiResponse } from "next"
import { RequestInit } from "isomorphic-fetch"

export const nextApiHandlerTest =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void, url: string) =>
  (
    test: (obj: { fetch: (init?: RequestInit) => Promise<Response> }) => Promise<void>
  ) =>
  async () => {
    await testApiHandler({
      handler,
      url,
      test: async ({ fetch }) => await test({ fetch }),
    })
  }
