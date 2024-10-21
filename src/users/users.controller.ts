import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";
import { userServiceResponses } from "src/interfaces/enums";
import { DataFromImage } from "src/interfaces/interfaces";
import { UpdateUserPositionDto } from "./dto/update-user-position.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("recruiter/:recruiterCode")
  async getUsersByRecruiter(
    @Param("recruiterCode") recruiterCode: string
  ): Promise<User[]> {
    return this.usersService.findUsersByRecruiterCode(recruiterCode);
  }

  // Recursive Endpoint to get a user with their recruiter and recruited
  @Get(":userCode/recruits")
  async getUserWithRecruits(
    @Param("userCode") userCode: string
  ): Promise<User> {
    return this.usersService.getUserWithRecruits(userCode);
  }

  @Post("updateuserposition")
  async saveProcessedData(
    @Body() data: UpdateUserPositionDto
  ): Promise<DataFromImage> {
    try {
      const savedUser = await this.usersService.updateUserPosition(data);
      return savedUser;
    } catch (error) {
      throw new HttpException(
        userServiceResponses.default,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get("three-generations")
  async getThreeGenerations(
    @Query("recruiterCode") recruiterCode: string
  ): Promise<User[]> {
    return await this.usersService.getThreeGenerations(recruiterCode);
  }

  @Post("insert-dummy-generations")
  async insertDummyGenerations(): Promise<User[]> {
    return await this.usersService.insertDummyGenerations();
  }
}
