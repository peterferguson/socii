
const verifyStream = (xApiKey: string): Response | null => {
  console.log(`Validating request came from Stream`)
  console.log("api-key", STREAM_API_KEY)
  if (STREAM_API_KEY !== xApiKey){
    console.log("Request came from invalid source")
    console.log("x-api-key", xApiKey)
    
    return new Response(JSON.stringify({
      body: { error: "Invalid request, signature is invalid" },
    }), {status: 401, headers: { "Content-Type": "application/json" }})
  }
  return null
}