import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";

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
}
