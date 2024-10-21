import { IsNotEmpty, IsString } from "class-validator";
import { DataFromImage } from "src/interfaces/interfaces"; // Importa la interfaz

// El DTO ahora extiende la interfaz DataFromImage para respetar el tipado
export class UpdateUserPositionDto implements DataFromImage {
  @IsNotEmpty()
  @IsString()
  userCode: string;

  @IsNotEmpty()
  @IsString()
  recruiterCode: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsString()
  userName: string;

  @IsString()
  recruiterName: string;

  @IsString()
  leaderName: string;

  @IsString()
  leaderCode: string;

  @IsString()
  homeAddress: string;

  @IsString()
  businessAddress: string;

  @IsString()
  spouseName: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  startDate?: Date;
  birthDate?: Date;
}
