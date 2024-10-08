import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { RepresentativeType, UserServiceRespones } from "src/interfaces/enums";
import { handleError } from "src/utils/HandleError";
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

  async updateUserPosition(
    userCode: string,
    representative: RepresentativeType
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { userCode } });
      if (!user) {
        return handleError(
          new NotFoundException(),
          UserServiceRespones.NotFound,
          HttpStatus.NOT_FOUND,
          userCode
        );
      }
      if (representative === RepresentativeType.StudentButton) {
        user.position = RepresentativeType.StudentPosition;
      } else if (representative === RepresentativeType.LicensedButton) {
        user.position = RepresentativeType.LicensedPosition;
      }

      const userUpdated = await this.userRepository.save(user);
      return userUpdated;
    } catch (error) {
      return handleError(
        error,
        UserServiceRespones.NotUpdated,
        HttpStatus.INTERNAL_SERVER_ERROR,
        userCode
      );
    }
  }
}
