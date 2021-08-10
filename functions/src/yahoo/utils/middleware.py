from flask.wrappers import Request


# - CORS decorator for GCP functions
def cors(fn):
    """Decorator for adding CORS headers to a GCP API response.

    Args:
        fn: The function to decorate.
    """

    def decorator(request: Request):
        # For more information about CORS and CORS preflight requests, see:
        # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

        # Set CORS headers for the preflight request
        if request.method == "OPTIONS":
            # Allows GET requests from any origin with the Content-Type
            # header and caches preflight response for an 3600s
            headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
            }

            return ("", 204, headers)

        # Set CORS headers for the main request
        headers = {
            "Access-Control-Allow-Origin": "*",
            # - Assume all requests return JSON
            "Content-Type": "application/json",
        }

        return (fn(request), 200, headers)

    return decorator
