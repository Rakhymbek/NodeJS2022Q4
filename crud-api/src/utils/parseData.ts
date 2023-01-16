import { IncomingMessage } from "http";

export default async function parseData(req: IncomingMessage) {
  return new Promise((res) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        res(JSON.parse(body));
      });
    } catch (error) {
      res(error);
    }
  });
}
