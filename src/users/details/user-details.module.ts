import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JobInformation } from "src/entities/job_information.entity";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";
import { PersonalInformation } from "src/entities/personal_information.entity";
import { Progress } from "src/entities/progress.entity";
import { UserDetailsService } from "./user-details.service";
import { UserDetailsController } from "./user-details.controler";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      JobInformation,
      LicenseAndTrainings,
      PersonalInformation,
      Progress,
    ]),
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos puedan acceder al UserRepository
})
export class UserDetailsModule {}
