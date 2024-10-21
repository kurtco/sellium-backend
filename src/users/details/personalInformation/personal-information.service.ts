import { Injectable } from "@nestjs/common";
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

  async save(
    createPersonalInformationDto: CreatePersonalInformationDto
  ): Promise<PersonalInformation> {
    const personalInformation = this.personalInformationRepository.create(
      createPersonalInformationDto
    );
    return this.personalInformationRepository.save(personalInformation);
  }
}
