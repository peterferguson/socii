// Conditions
const Method = (method: string) => (req: Request) =>
  req.method.toLowerCase() === method.toLowerCase()

// Helper functions that when passed a request
// will return a boolean for if that request uses that method, header, etc..
const Get = Method("get")
const Post = Method("post")
const Patch = Method("patch")
const Delete = Method("delete")

const Path = (regExp: string) => (req: Request) => {
  const url = new URL(req.url)
  const path = url.pathname
  return path.match(regExp) && path.match(regExp)?.[0] === path
}

type Condition = (req: Request) => boolean | null

interface Route {
  conditions: Condition[]
  handler: (req: Request) => Promise<Response>
}

// Router
class Router {
  routes: Route[]

  constructor() {
    this.routes = []
  }

  handle(
    conditions: Condition[],
    handler: (req: Request) => Promise<Response>,
  ): Router {
    this.routes.push({
      conditions,
      handler,
    })
    return this
  }

  get(url: string, handler: (req: Request) => Promise<Response>): Router {
    return this.handle([Get, Path(url)], handler)
  }

  post(url: string, handler: (req: Request) => Promise<Response>): Router {
    return this.handle([Post, Path(url)], handler)
  }

  patch(url: string, handler: (req: Request) => Promise<Response>): Router {
    return this.handle([Patch, Path(url)], handler)
  }

  delete(url: string, handler: (req: Request) => Promise<Response>): Router {
    return this.handle([Delete, Path(url)], handler)
  }

  all(handler: (req: Request) => Promise<Response>): Router {
    return this.handle([], handler)
  }

  async route(req: Request): Promise<Response> {
    const route = this.resolve(req)

    if (route) {
      return await route.handler(req)
    }

    return new Response("resource not found", {
      status: 404,
      statusText: "not found",
      headers: {
        "content-type": "text/plain",
      },
    })
  }

  // resolve returns the matching route, if any
  resolve(req: Request): Route | null | undefined {
    return this.routes.find((r) => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true
      }

      return r.conditions.every((c) => c(req))
    })
  }
}

export default Router
