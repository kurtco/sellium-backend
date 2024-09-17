import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

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
}
