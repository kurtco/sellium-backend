import { Controller, Get, Param } from "@nestjs/common";
import { UserDetailsService } from "./user-details.service";

@Controller("user-details")
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Get(":userCode")
  async getUserDetails(@Param("userCode") userCode: string): Promise<any> {
    return this.userDetailsService.getUserDetails(userCode);
  }
}
