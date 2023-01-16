import { createServer, IncomingMessage, ServerResponse } from "http";
import routesHandler from "./handlers/routesHandler";

const PORT: number = Number(process.env.PORT) || 4000;
const HOST: string = process.env.HOST || "localhost";

async function requestListener(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  try {
    const data = await routesHandler(req);
    if (data) {
      const { headers, statusCode, body } = data;
      res.writeHead(statusCode, headers);
      res.write(body);
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
}

export const server = createServer(requestListener).listen({ port: PORT, host: HOST }, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});


process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Server on http://${HOST}:${PORT} is closed`);
    process.exit()
  });
})
