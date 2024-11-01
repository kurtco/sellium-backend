import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Progress } from "src/entities/progress.entity";
import { ProgressController } from "./progress.controler";
import { ProgressService } from "./progress.service";

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
