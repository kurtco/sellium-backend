export interface DataFromImage {
  recruiterName: string;
  leaderName: string;
  leaderCode: string;
  startDate?: Date;
  birthDate?: Date;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
}

export interface HttpSuccessResponse<T = any> {
  data: T;
}

export interface HttpErrorResponse<T = unknown> {
  statusCode?: number;
  error: string;
  message: string;
  userCode?: string;
  data?: T;
}

export type ProcessImageResponse = HttpSuccessResponse | HttpErrorResponse;
