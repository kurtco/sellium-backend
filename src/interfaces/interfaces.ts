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

export interface PersonalInformation {
  userCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  insured?: string;
  productType?: string;
  phoneCode?: string;
  phoneNumber?: string;
  email?: string;
  homeAddress?: string;
  businessAddress?: string;
  spouseName?: string;
}

export interface JobInformation {
  userCode: string;
  promotionDate?: string;
  personalCode?: string;
  partOfCompanySince?: string;
  eo?: boolean;
  appointed?: string;
}

export interface LicenseAndTrainings {
  userCode: string;
  licenseType: string;
  expires: string;
  fastStar: boolean;
  state: string;
  presented: string;
  approved?: boolean;
  orientation1?: boolean;
  orientation2?: boolean;
  orientation3?: boolean;
  orientation4?: boolean;
  bootCamp?: boolean;
}

export interface Users {
  id: number;
  recruiterName: string;
  recruiterCode: string;
  leaderName: string;
  leaderCode: string;
  userName: string;
  position: string;

  userCode: string;
  startDate: string;
  birthDate: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
}
