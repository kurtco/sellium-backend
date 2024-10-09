import { HttpException, HttpStatus } from "@nestjs/common";
import { defaultErrorMessage } from "src/config/constants";
import { HttpErrorResponse } from "src/interfaces/interfaces";

export function handleError<T>(
  error: string,
  message: string,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  userCode?: string,
  data?: T
): never {
  const response: HttpErrorResponse<T> = {
    error: error || defaultErrorMessage,
    message,
    userCode,
    data,
  };
  throw new HttpException(response, statusCode);
}
