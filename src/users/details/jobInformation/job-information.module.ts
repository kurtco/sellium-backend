import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobInformation } from "src/entities/job_information.entity";
import { JobInformationService } from "./job-information.service";
import { JobInformationController } from "./job-information.controller";
import { UserDetailsModule } from "src/users/details/user-details.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobInformation]),
    UserDetailsModule,
    UsersModule,
  ],
  providers: [JobInformationService],
  controllers: [JobInformationController],
})
export class JobInformationModule {}
