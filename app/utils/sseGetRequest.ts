import https, { IncomingMessage } from "http";
import { NextApiResponse } from "next";

export const sseGetRequest = async (
  url: string,
  responseCallback: (res: IncomingMessage) => void
) => {
  const headers = {
    Authorization: `Basic ${Buffer.from(
      process.env.ALPACA_KEY + ":" + process.env.ALPACA_SECRET
    ).toString("base64")}`,
    "content-type": "text/event-stream",
  };
  https.get(url, { headers }, responseCallback).on("error", (err) => {
    console.log("HTTP Request Error: ", err.message);
  });
};
export interface BaseServer {
  url: string;
  variableConfiguration: object;
}
export const httpResponseCallback = (res: NextApiResponse, endpoint: string) => (response) => {
  let data = [];
  const headerDate = response.headers && response.headers.date
    ? response.headers.date
    : "no response date";
  console.log("Status Code:", response.statusCode);
  console.log("Date in Response header:", headerDate);

  response.on("data", (chunk) => {
    res.send(chunk);
    data.push(chunk);
  });

  response.on("end", () => {
    response.destroy();
    console.log(Buffer.concat(data).toString());
    res.end(
      `Response from ${endpoint} endpoint has ended: ${Buffer.concat(data).toString()}`
    );
  });
};
