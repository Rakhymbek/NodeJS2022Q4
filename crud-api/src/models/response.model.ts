import { IUser, IUsers } from './users.model';
import { IncomingHttpHeaders } from "http";

export interface IResponse {
  body: XMLHttpRequestBodyInit;
  statusCode: number;
  headers: IncomingHttpHeaders;
}

export type IResponseBody = IUsers | IUser | string;