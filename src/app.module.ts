import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OcrModule } from "./ocr/ocr.module";
import { UsersModule } from "./users/users.module";
import { PersonalInformationModule } from "./users/details/personalInformation/personal-information.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    OcrModule,
    UsersModule,
    PersonalInformationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
