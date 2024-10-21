import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { PersonalInformation } from "src/interfaces/interfaces";

export class CreatePersonalInformationDto implements PersonalInformation {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  insured?: string;

  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsString()
  phone?: string;

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
