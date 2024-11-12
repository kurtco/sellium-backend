import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LicenseAndTrainings } from "src/entities/license_and_trainings.entity";
import { CreateLicenseTrainings } from "src/users/dto/create-license-trainings-dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/entities/user.entity";
import { RepresentativeType } from "src/interfaces/enums";

@Injectable()
export class LicenseTrainingsService {
  constructor(
    @InjectRepository(LicenseAndTrainings)
    private readonly licenseTrainingsRepository: Repository<LicenseAndTrainings>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService
  ) {}

  // Method to create or update a LicenseAndTrainings record
  async saveOrUpdate(
    createLicenseTrainingsDto: CreateLicenseTrainings
  ): Promise<LicenseAndTrainings> {
    const { userCode, approved } = createLicenseTrainingsDto;

    // Find existing license and user in parallel
    const [existingLicenseTraining, currentUser] = await Promise.all([
      this.licenseTrainingsRepository.findOne({ where: { userCode } }),
      this.userRepository.findOne({ where: { userCode } }),
    ]);

    if (!currentUser) {
      throw new NotFoundException(`User with userCode ${userCode} not found`);
    }

    // Update user position based on "approved" status
    if (
      currentUser.position === RepresentativeType.LicensedPosition ||
      currentUser.position === RepresentativeType.StudentPosition
    ) {
      currentUser.position = approved
        ? RepresentativeType.LicensedPosition
        : RepresentativeType.StudentPosition;

      await this.userRepository.save(currentUser);
    }

    // Update or create license training record
    if (existingLicenseTraining) {
      this.licenseTrainingsRepository.merge(
        existingLicenseTraining,
        createLicenseTrainingsDto
      );
      return this.licenseTrainingsRepository.save(existingLicenseTraining);
    }

    const newLicenseTrainings = this.licenseTrainingsRepository.create(
      createLicenseTrainingsDto
    );
    return this.licenseTrainingsRepository.save(newLicenseTrainings);
  }
}
