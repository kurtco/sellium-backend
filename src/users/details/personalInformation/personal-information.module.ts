import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonalInformationController } from "./personal-information.controller";
import { PersonalInformationService } from "./personal-information.service";
import { PersonalInformation } from "src/entities/personal_information.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInformation])],
  controllers: [PersonalInformationController],
  providers: [PersonalInformationService],
})
export class PersonalInformationModule {}
