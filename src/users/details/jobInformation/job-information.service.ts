import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity"; // Entidad User
import { JobInformation } from "src/entities/job_information.entity"; // Entidad JobInformation
import { PersonalInformation } from "src/entities/personal_information.entity"; // Entidad Personal Information
import { CreateJobInformationDto } from "../../dto/create-job-information.dto";

// Definir el tipo usando Pick para limitar los campos de User
type PickedUser = Pick<
  User,
  "recruiterName" | "recruiterCode" | "leaderName" | "leaderCode"
>;

@Injectable()
export class JobInformationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(JobInformation)
    private readonly jobInformationRepository: Repository<JobInformation>
  ) {}

  // Method to save/update job information and return JobInformation and a User Pick
  async save(
    createJobInformationDto: CreateJobInformationDto
  ): Promise<{ jobInformation: JobInformation; user: PickedUser }> {
    const {
      userCode,
      recruiter,
      recruiterCode,
      leaderName,
      position,
      ...jobInfoData
    } = createJobInformationDto;

    // Paso 1: Buscar al usuario en la tabla `User`
    const user = await this.userRepository.findOne({ where: { userCode } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Step 2: Update user information in the `User` table
    user.recruiterName = recruiter || user.recruiterName;
    user.recruiterCode = recruiterCode || user.recruiterCode;
    user.leaderName = leaderName || user.leaderName;
    user.position = position || user.position;
    await this.userRepository.save(user); // Guardamos solo si hay cambios

    // Step 3: Check if a record already exists in `JobInformation`
    let jobInformation = await this.jobInformationRepository.findOne({
      where: { userCode },
    });
    if (jobInformation) {
      //if it exists we updated
      this.jobInformationRepository.merge(jobInformation, jobInfoData);
    } else {
      // if its not we create a new one
      jobInformation = this.jobInformationRepository.create({
        ...jobInfoData,
        user,
      });
    }
    await this.jobInformationRepository.save(jobInformation);
    // Return job information and only selected fields of the user
    const pickedUser: PickedUser = {
      recruiterName: user.recruiterName,
      recruiterCode: user.recruiterCode,
      leaderName: user.leaderName,
      leaderCode: user.leaderCode,
    };

    return { jobInformation, user: pickedUser };
  }
}
