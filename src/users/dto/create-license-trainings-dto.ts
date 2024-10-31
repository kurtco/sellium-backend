import { IsNotEmpty, IsOptional, IsString, IsBoolean } from "class-validator";
import { LicenseAndTrainings } from "src/interfaces/interfaces";
export class CreateLicenseTrainings implements LicenseAndTrainings {
  @IsNotEmpty()
  @IsString()
  userCode: string;

  @IsOptional()
  @IsString()
  licenseType: string;

  @IsOptional()
  @IsString()
  expires: string;

  @IsOptional()
  @IsBoolean()
  fastStar: boolean;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  presented: string;

  @IsOptional()
  @IsBoolean()
  approved: boolean;

  @IsOptional()
  @IsBoolean()
  orientation1: boolean;

  @IsOptional()
  @IsBoolean()
  orientation2: boolean;

  @IsOptional()
  @IsBoolean()
  orientation3: boolean;

  @IsOptional()
  @IsBoolean()
  orientation4: boolean;

  @IsOptional()
  @IsBoolean()
  bootCamp: boolean;
}
