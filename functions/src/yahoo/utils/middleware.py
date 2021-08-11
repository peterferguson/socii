from flask.wrappers import Request
import json

with open("./whitelist.json") as f:
    whitelist = json.load(f)

# - CORS decorator for GCP functions
def cors(**kwargs):
    methods = kwargs.get("methods", ["GET", "POST"])
    content_type = kwargs.get("content_type", "application/json")

    def wrapper(fn):
        """Decorator for adding CORS headers to a GCP API response.

        Args:
            fn: The function to decorate.
        """
        def decorator(request: Request):
            # Set CORS headers for the preflight request
            if request.method == "OPTIONS":
                # Allows GET requests from any origin with the Content-Type
                # header and caches preflight response for an 3600s
                headers = {
                    "Access-Control-Allow-Origin": whitelist,
                    "Access-Control-Allow-Methods": methods,
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Max-Age": "3600",
                }

                return ("", 204, headers)

            # Set CORS headers for the main request
            headers = {
                "Access-Control-Allow-Origin": whitelist,
                "Content-Type": content_type,
            }

            return (fn(request), 200, headers)

        return decorator

    return wrapper


if __name__ == "__main__":
    print(whitelist)