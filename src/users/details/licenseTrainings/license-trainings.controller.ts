import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { LicenseTrainingsService } from "./license-trainings.service";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";
import { CreateLicenseTrainings } from "src/users/dto/create-license-trainings-dto";

@Controller("license-trainings")
export class LicenseTrainingsController {
  constructor(
    private readonly licenseTrainingsService: LicenseTrainingsService
  ) {}

  // POST endpoint to create or update LicenseAndTrainings data
  @Post("save")
  async saveLicenseTrainings(
    @Body() createLicenseTrainingsDto: CreateLicenseTrainings
  ): Promise<{ message: string; data: LicenseAndTrainings }> {
    try {
      const savedData = await this.licenseTrainingsService.saveOrUpdate(
        createLicenseTrainingsDto
      );
      return {
        message: "License and trainings information saved successfully",
        data: savedData,
      };
    } catch (error) {
      throw new HttpException(
        "Error saving license and trainings information",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
