import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { JobInformation } from "src/interfaces/interfaces";

export class CreateJobInformationDto implements JobInformation {
  @IsNotEmpty()
  @IsString()
  userCode: string;

  @IsOptional()
  @IsString()
  promotionDate: string;

  @IsOptional()
  @IsString()
  personalCode: string;

  @IsOptional()
  @IsString()
  partOfCompanySince: string;

  @IsOptional()
  @IsBoolean()
  eo: boolean;

  @IsOptional()
  @IsString()
  appointed: string;

  @IsOptional()
  @IsString()
  spouseName?: string;

  @IsOptional()
  @IsString()
  recruiter?: string;

  @IsOptional()
  @IsString()
  recruiterCode?: string;

  @IsOptional()
  @IsString()
  leaderName?: string;

  @IsOptional()
  @IsString()
  position?: string;
}
