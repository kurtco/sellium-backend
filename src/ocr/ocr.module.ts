import { Module } from "@nestjs/common";
import { OcrController } from "./ocr.controller";
import { OcrService } from "./ocr.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [OcrController],
  providers: [OcrService],
})
export class OcrModule {}
