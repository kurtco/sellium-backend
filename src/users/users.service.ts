import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findUsersByRecruiterCode(recruiterCode: string): Promise<User[]> {
    return this.userRepository.find({
      where: { recruiterCode },
    });
  }

  // Recursive method to get a user along with their recruiter and recruiters
  async getUserWithRecruits(userCode: string): Promise<User> {
    return this.userRepository.findOne({
      where: { userCode },
      relations: ["recruiter", "recruits"], // Load recursive relations created in the user entity
    });
  }
}
