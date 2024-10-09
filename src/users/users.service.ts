import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { DataFromImage } from "src/interfaces/interfaces";
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

  async saveUserData(extractedData: DataFromImage): Promise<User> {
    let recruiter = await this.userRepository.findOne({
      where: { userCode: extractedData.recruiterCode },
    });

    // If the recruiter (reclutador) does not exist, create a new record for him/her
    if (!recruiter) {
      recruiter = this.userRepository.create({
        userCode: String(extractedData.recruiterCode),
        userName: extractedData.recruiterName,
        leaderName: extractedData.leaderName,
        leaderCode: extractedData.leaderCode,
      });
      await this.userRepository.save(recruiter);
    }
    const user = this.userRepository.create(extractedData);
    return await this.userRepository.save(user);
  }
}
