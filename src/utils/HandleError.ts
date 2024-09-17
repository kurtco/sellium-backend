import { defaultErrorMessage } from "src/config/constants";
import { HttpErrorResponse } from "src/interfaces/interfaces";

export function handleError(error: any, message: string): HttpErrorResponse {
  return {
    error: error.message || defaultErrorMessage,
    message,
  };
}
