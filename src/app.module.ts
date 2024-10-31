import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OcrModule } from "./ocr/ocr.module";
import { UsersModule } from "./users/users.module";
import { PersonalInformationModule } from "./users/details/personalInformation/personal-information.module";
import { UserDetailsModule } from "./users/details/user-details.module";
import { JobInformationModule } from "./users/details/jobInformation/job-information.module";
import { LicenseTrainingsModule } from "./users/details/licenseTrainings/license-trainings.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    OcrModule,
    UsersModule,
    UserDetailsModule,
    PersonalInformationModule,
    JobInformationModule,
    LicenseTrainingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
