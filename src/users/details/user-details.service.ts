import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { JobInformation } from "src/entities/job_information.entity";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";
import { PersonalInformation } from "src/entities/personal_information.entity";
import { Progress } from "src/entities/progress.entity";

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(JobInformation)
    private jobInformationRepository: Repository<JobInformation>,
    @InjectRepository(LicenseAndTrainings)
    private licenseAndTrainingsRepository: Repository<LicenseAndTrainings>,
    @InjectRepository(PersonalInformation)
    private personalInformationRepository: Repository<PersonalInformation>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>
  ) {}

  async getUserDetails(userCode: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { userCode } });
    if (!user) {
      throw new Error(`User with userCode ${userCode} not found`);
    }

    const jobInformation = await this.jobInformationRepository.findOne({
      where: { userCode },
    });
    const personalInformation =
      await this.personalInformationRepository.findOne({ where: { userCode } });
    const licenseAndTrainings =
      await this.licenseAndTrainingsRepository.findOne({
        where: { userCode },
      });
    const progress = await this.progressRepository.findOne({
      where: { userCode },
    });

    return {
      user,
      jobInformation,
      personalInformation,
      licenseAndTrainings,
      progress,
    };
  }
}
