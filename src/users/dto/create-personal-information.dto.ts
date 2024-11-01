import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";
import { PersonalInformation } from "src/interfaces/interfaces";

export class CreatePersonalInformationDto implements PersonalInformation {
  @IsNotEmpty()
  @IsString()
  userCode: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  @IsBoolean()
  insured?: boolean;

  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsString()
  phoneCode?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  homeAddress?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  @IsOptional()
  @IsString()
  spouseName?: string;
}
