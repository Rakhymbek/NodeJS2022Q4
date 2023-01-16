export enum ErrorMessages {
  INVALID_ROUTE = "Page is not found",
  INVALID_ID = "Invalid user's id",
  NO_USER = "User was not found",
  INVALID_DATA_TYPE = "Unprocessable Entity",
  INVALID_BODY = "Request body does not contain required fields",
  NOT_ALLOWED = "Method Not Allowed",
  SERVER_ERROR = "Internal Server Error"
}


export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}