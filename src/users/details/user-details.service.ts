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

  // Calculate the percentage of completion
  private calculateCompletionPercentage(data: any): number {
    const totalFields = Object.keys(data).length;
    const filledFields = Object.values(data).filter(
      (value) => value !== null && value !== undefined && value !== ""
    ).length;

    return (filledFields / totalFields) * 100;
  }

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
    const licenseAndTrainings = await this.licenseAndTrainingsRepository.find({
      where: { userCode },
    });
    const progress = await this.progressRepository.findOne({
      where: { userCode },
    });

    // Sum all fields for completion calculation
    const allTablesData = {
      user,
      jobInformation,
      personalInformation,
      progress,
    };

    let totalFields = 0;
    let filledFields = 0;

    for (const section in allTablesData) {
      if (allTablesData[section]) {
        const sectionData = allTablesData[section];
        totalFields += Object.keys(sectionData).length;
        filledFields += Object.values(sectionData).filter(
          (value) => value !== null && value !== undefined && value !== ""
        ).length;
      }
    }
    const profileCompletion = Math.round((filledFields / totalFields) * 100);

    return {
      user,
      jobInformation,
      personalInformation,
      licenseAndTrainings,
      progress,
      profileCompletion,
    };
  }
}
