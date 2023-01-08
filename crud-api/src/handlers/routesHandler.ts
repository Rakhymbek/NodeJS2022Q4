import { IncomingMessage } from "http";
import { IResponse } from "../models/response.model";
import get from "../routes/get";

export default async function routesHandler(
  req: IncomingMessage
): Promise<IResponse | undefined> {
  const endpoint = req.url?.split("/").slice(1, 3).join("/");

  if (endpoint === "api/users") {
    switch (req.method) {
      case "GET":
        return await get();
    }
  }
}
