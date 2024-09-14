export interface DataFromImage {
  recruiter: string;
  leader: string;
  startDate: string;
  birthDate: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouse: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
}

export interface HttpSuccessResponse<T = any> {
  data: T; // Aquí 'T' es el tipo que será flexible
}

export interface HttpErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}

// Define un tipo combinado que puede ser tanto una respuesta exitosa como un error
export type ProcessImageResponse = HttpSuccessResponse | HttpErrorResponse;
