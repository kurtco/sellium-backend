import { HttpException, HttpStatus } from "@nestjs/common";
import { defaultErrorMessage } from "src/config/constants";
import { HttpErrorResponse } from "src/interfaces/interfaces";

export function handleError(
  error: any,
  message: string,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR // Código de estado por defecto
): never {
  const response: HttpErrorResponse = {
    error: error.message || defaultErrorMessage,
    message,
  };
  throw new HttpException(response, statusCode);
}
