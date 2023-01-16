import { IResponseBody } from './../models/response.model';

export default async function getFormattedResponse(
  responseBody: IResponseBody,
  statusCode: number
) {
  const data = {
    headers: { "Content-Type": "application/json" },
    statusCode,
    body: JSON.stringify(responseBody),
  };
  return data;
}
