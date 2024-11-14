import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Progress } from "src/entities/progress.entity";
import { CreateProgressDto } from "src/users/dto/create-progress.dto";
import { ProgressService } from "./progress.service";

@Controller("progress")
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Endpoint POST para crear o actualizar el progreso
  @Post("save")
  async saveProgress(
    @Body() createProgressDto: CreateProgressDto
  ): Promise<{ message: string; data: Progress }> {
    try {
      const savedData =
        await this.progressService.saveOrUpdate(createProgressDto);
      return {
        message: "Progress information saved successfully",
        data: savedData,
      };
    } catch (error) {
      throw new HttpException(
        "Error saving progress information",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
