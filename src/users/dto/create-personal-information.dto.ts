import { IsNotEmpty, IsString, IsOptional } from "class-validator";
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
  @IsString()
  insured?: string;

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
