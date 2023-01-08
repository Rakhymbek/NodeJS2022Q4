import { IncomingHttpHeaders } from "http";

export interface IResponse {
  body: XMLHttpRequestBodyInit;
  statusCode: number;
  headers: IncomingHttpHeaders;
}
