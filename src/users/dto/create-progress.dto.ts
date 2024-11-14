import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { Progress } from "src/interfaces/interfaces";

export class CreateProgressDto implements Progress {
  @IsNotEmpty()
  @IsString()
  userCode: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  januaryPoints: number;

  @IsOptional()
  @IsNumber()
  januaryPercentage: number;

  @IsOptional()
  @IsNumber()
  februaryPoints: number;

  @IsOptional()
  @IsNumber()
  februaryPercentage: number;

  @IsOptional()
  @IsNumber()
  marchPoints: number;

  @IsOptional()
  @IsNumber()
  marchPercentage: number;

  @IsOptional()
  @IsNumber()
  aprilPoints: number;

  @IsOptional()
  @IsNumber()
  aprilPercentage: number;

  @IsOptional()
  @IsNumber()
  mayPoints: number;

  @IsOptional()
  @IsNumber()
  mayPercentage: number;

  @IsOptional()
  @IsNumber()
  junePoints: number;

  @IsOptional()
  @IsNumber()
  junePercentage: number;

  @IsOptional()
  @IsNumber()
  julyPoints: number;

  @IsOptional()
  @IsNumber()
  julyPercentage: number;

  @IsOptional()
  @IsNumber()
  augustPoints: number;

  @IsOptional()
  @IsNumber()
  augustPercentage: number;

  @IsOptional()
  @IsNumber()
  septemberPoints: number;

  @IsOptional()
  @IsNumber()
  septemberPercentage: number;

  @IsOptional()
  @IsNumber()
  octoberPoints: number;

  @IsOptional()
  @IsNumber()
  octoberPercentage: number;

  @IsOptional()
  @IsNumber()
  novemberPoints: number;

  @IsOptional()
  @IsNumber()
  novemberPercentage: number;

  @IsOptional()
  @IsNumber()
  decemberPoints: number;

  @IsOptional()
  @IsNumber()
  decemberPercentage: number;

  @IsOptional()
  @IsNumber()
  numberOfAgents: number;

  @IsOptional()
  @IsNumber()
  numberOfPoliciesSold: number;

  @IsOptional()
  @IsBoolean()
  isCoach: boolean;

  @IsOptional()
  @IsBoolean()
  netLicense: boolean;
}
