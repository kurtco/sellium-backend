import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { JobInformationService } from "./job-information.service";
import { CreateJobInformationDto } from "src/users/dto/create-job-information.dto";
import { JobInformation } from "src/interfaces/interfaces";

@Controller("job-information")
export class JobInformationController {
  constructor(private readonly jobInformationService: JobInformationService) {}

  // Endpoint para guardar la información de trabajo y retornar JobInformation + PickedUser
  @Post()
  async saveJobInformation(
    @Body() createJobInformationDto: CreateJobInformationDto
  ): Promise<{
    message: string;
    data: {
      jobInformation: JobInformation;
      user: {
        recruiterName: string;
        recruiterCode: string;
        leaderName: string;
        leaderCode: string;
      };
    };
  }> {
    try {
      const savedData = await this.jobInformationService.save(
        createJobInformationDto
      );
      return {
        message: "Job information saved successfully",
        data: savedData,
      };
    } catch (error) {
      throw new HttpException(
        "Error saving job information",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
