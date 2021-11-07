from flask.wrappers import Request
import json
import logging

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

            # - Set CORS headers
            headers = {}

            origin = request.headers.get("Origin", "")
            referrer = request.headers.get("Referer", "")
            logging.info(f"CORS request from {origin or referrer}")
            
            if origin or referrer in whitelist:
                headers["Access-Control-Allow-Origin"] = origin or referrer
                logging.info(f"CORS request allowed from {origin or referrer}")

            # Set CORS headers for the preflight request
            if request.method == "OPTIONS":
                # Allows GET requests from any origin with the Content-Type
                # header and caches preflight response for an 3600s

                # TODO: Add support for selecting allowed origins

                headers = {
                    **headers,
                    "Access-Control-Allow-Methods": methods,
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Max-Age": "3600",
                    "Vary": "Origin",
                }

                return ("", 204, headers)

            # Set CORS headers for the main request
            headers = {
                **headers,
                "Content-Type": content_type,
            }

            return (
                (fn(request), 200, headers)
                if origin or referrer in whitelist
                else (fn(request), 403, {})
            )

        return decorator

    return wrapper


if __name__ == "__main__":
    print(whitelist)