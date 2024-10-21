import { Module } from "@nestjs/common";
import { OcrController } from "./ocr.controller";
import { OcrService } from "./ocr.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JobInformation } from "src/entities/job_information.entity";
import { Progress } from "src/entities/progress.entity";
import { PersonalInformation } from "src/entities/personal_information.entity";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      PersonalInformation,
      JobInformation,
      LicenseAndTrainings,
      Progress,
    ]),
  ],
  controllers: [OcrController],
  providers: [OcrService],
})
export class OcrModule {}
