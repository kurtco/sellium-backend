import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PersonalInformation } from "src/entities/personal_information.entity"; // Entidad de Personal Information
import { CreatePersonalInformationDto } from "../../dto/create-personal-information.dto";

@Injectable()
export class PersonalInformationService {
  constructor(
    @InjectRepository(PersonalInformation)
    private readonly personalInformationRepository: Repository<PersonalInformation>
  ) {}

  async saveOrUpdate(
    createPersonalInformationDto: CreatePersonalInformationDto
  ): Promise<PersonalInformation> {
    const { userCode } = createPersonalInformationDto;

    const existingPersonalInfo =
      await this.personalInformationRepository.findOne({ where: { userCode } });

    if (existingPersonalInfo) {
      this.personalInformationRepository.merge(
        existingPersonalInfo,
        createPersonalInformationDto
      );
      return this.personalInformationRepository.save(existingPersonalInfo);
    } else {
      const newPersonalInfo = this.personalInformationRepository.create(
        createPersonalInformationDto
      );
      return this.personalInformationRepository.save(newPersonalInfo);
    }
  }
}
