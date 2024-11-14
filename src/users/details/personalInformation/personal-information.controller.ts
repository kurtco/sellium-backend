import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreatePersonalInformationDto } from "src/users/dto/create-personal-information.dto";
import { PersonalInformationService } from "./personal-information.service";
import { PersonalInformation } from "src/interfaces/interfaces";

@Controller("personal-information")
export class PersonalInformationController {
  constructor(
    private readonly personalInformationService: PersonalInformationService
  ) {}

  @Post("save")
  async savePersonalInformation(
    @Body() createPersonalInformationDto: CreatePersonalInformationDto
  ): Promise<{ message: string; data: PersonalInformation }> {
    try {
      const savedData = await this.personalInformationService.saveOrUpdate(
        createPersonalInformationDto
      );
      return {
        message: "Personal information saved successfully",
        data: savedData,
      };
    } catch (error) {
      throw new HttpException(
        "Error saving personal information",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
