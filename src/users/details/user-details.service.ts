import { Injectable, NotFoundException } from "@nestjs/common";
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
    private readonly userRepository: Repository<User>,
    @InjectRepository(JobInformation)
    private readonly jobInformationRepository: Repository<JobInformation>,
    @InjectRepository(LicenseAndTrainings)
    private readonly licenseAndTrainingsRepository: Repository<LicenseAndTrainings>,
    @InjectRepository(PersonalInformation)
    private readonly personalInformationRepository: Repository<PersonalInformation>,
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>
  ) {}

  async getUserDetails(userCode: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { userCode } });

    if (!user) {
      throw new NotFoundException(`User with userCode ${userCode} not found`);
    }

    // Buscar las entidades relacionadas
    const [jobInformation, personalInformation, licenseAndTrainings, progress] =
      await Promise.all([
        this.jobInformationRepository.findOne({ where: { userCode } }),
        this.personalInformationRepository.findOne({ where: { userCode } }),
        this.licenseAndTrainingsRepository.findOne({ where: { userCode } }),
        this.progressRepository.findOne({ where: { userCode } }),
      ]);

    return {
      user,
      jobInformation,
      personalInformation,
      licenseAndTrainings,
      progress,
    };
  }
}
