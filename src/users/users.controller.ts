import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";
import { RepresentativeType } from "src/interfaces/enums";

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

  @Patch(":userCode/position")
  async updateUserPosition(
    @Param("userCode") userCode: string,
    @Body("representative") representative: RepresentativeType
  ): Promise<User> {
    const result = await this.usersService.updateUserPosition(
      userCode,
      representative
    );
    return result;
  }
}
