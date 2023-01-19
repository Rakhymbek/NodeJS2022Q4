import { httpServer } from "./src/http_server/index.js";
import { createWebSocketStream, WebSocketServer } from "ws";
import commandsHandler from "./src/commandsHandler.js";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`Start websocket server on the ${WS_PORT} port!`);

wss.on("connection", (ws) => {
  const webSocketStream = createWebSocketStream(ws, {
    encoding: "utf-8",
    decodeStrings: false,
  });
  webSocketStream.on("data", async (data) => {
    const commandsResponse = await commandsHandler(data);
    webSocketStream.write(commandsResponse);
  });
});

wss.on('close', () => console.log("Close connection"))

process.on("SIGINT", () => {
  console.log("Server is closed")
})