import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";
import { CreateLicenseTrainings } from "src/users/dto/create-license-trainings-dto";

@Injectable()
export class LicenseTrainingsService {
  constructor(
    @InjectRepository(LicenseAndTrainings)
    private readonly licenseTrainingsRepository: Repository<LicenseAndTrainings>
  ) {}

  // Method to create or update a LicenseAndTrainings record
  async saveOrUpdate(
    createLicenseTrainingsDto: CreateLicenseTrainings
  ): Promise<LicenseAndTrainings> {
    const { userCode, ...rest } = createLicenseTrainingsDto;

    // Step 1: Check if a record exists with the provided userCode
    let licenseTraining = await this.licenseTrainingsRepository.findOne({
      where: { userCode },
    });
    console.log("que demonios es ", licenseTraining);
    if (licenseTraining) {
      // If record exists, update it with new data
      this.licenseTrainingsRepository.merge(licenseTraining, rest);
      return this.licenseTrainingsRepository.save(licenseTraining);
    } else {
      // If record doesn't exist, create a new one
      licenseTraining = this.licenseTrainingsRepository.create({
        userCode,
        ...rest,
      });

      return this.licenseTrainingsRepository.save(licenseTraining);
    }
  }
}
