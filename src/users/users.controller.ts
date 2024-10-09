import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";
import { userServiceResponses } from "src/interfaces/enums";
import { DataFromImage } from "src/interfaces/interfaces";

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

  @Post("newuser")
  async saveProcessedData(@Body() data: DataFromImage): Promise<DataFromImage> {
    try {
      const savedUser = await this.usersService.saveUserData(data);
      return savedUser;
    } catch (error) {
      throw new HttpException(
        userServiceResponses.default,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
