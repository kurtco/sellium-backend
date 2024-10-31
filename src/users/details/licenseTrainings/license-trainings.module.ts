import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LicenseTrainingsController } from "./license-trainings.controller";
import { LicenseTrainingsService } from "./license-trainings.service";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LicenseAndTrainings])],
  controllers: [LicenseTrainingsController],
  providers: [LicenseTrainingsService],
})
export class LicenseTrainingsModule {}
