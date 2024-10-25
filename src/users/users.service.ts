import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { dummyUsers } from "src/config/constants";
import { User } from "src/entities/user.entity";
import { DataFromImage } from "src/interfaces/interfaces";
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

  async updateUserPosition(extractedData: DataFromImage): Promise<User> {
    let recruiter = await this.userRepository.findOne({
      where: { userCode: extractedData.recruiterCode },
    });
    if (!recruiter) {
      recruiter = this.userRepository.create({
        userCode: String(extractedData.recruiterCode),
        userName: extractedData.recruiterName,
        leaderName: extractedData.leaderName,
        leaderCode: extractedData.leaderCode,
      });
      await this.userRepository.save(recruiter);
    }
    let recruit = await this.userRepository.findOne({
      where: { userCode: extractedData.userCode },
    });

    if (recruit) {
      recruit.position = extractedData.position;
      return await this.userRepository.save(recruit);
    } else {
      const newUser = this.userRepository.create(extractedData);
      return await this.userRepository.save(newUser);
    }
  }

  async getThreeGenerations(recruiterCode: string): Promise<User[]> {
    const query = `
    WITH RECURSIVE Generaciones AS (
      SELECT 
        "id",
        "recruiterCode",
        "userCode",
        "userName",
        "position",
        1 AS nivel
      FROM 
        public."user"
      WHERE 
        "recruiterCode" = $1

      UNION ALL

      SELECT 
        u."id",
        u."recruiterCode",
        u."userCode",
        u."userName",
        u."position",
        g.nivel + 1 AS nivel
      FROM 
        public."user" u
      INNER JOIN 
        Generaciones g ON u."recruiterCode" = g."userCode"
    )
    SELECT *
    FROM Generaciones
    WHERE nivel <= 3
    ORDER BY nivel, "id";
  `;

    return await this.userRepository.query(query, [recruiterCode]);
  }

  async insertDummyGenerations(): Promise<User[]> {
    const savedUsers = [];

    for (const userData of dummyUsers) {
      let recruiter = await this.userRepository.findOne({
        where: { userCode: userData.recruiterCode },
      });

      // Si el reclutador no existe, crear un nuevo registro para él/ella
      if (!recruiter) {
        recruiter = this.userRepository.create({
          userCode: userData.recruiterCode,
          userName: userData.recruiterName,
          leaderName: userData.leaderName,
          leaderCode: userData.leaderCode,
        });
        await this.userRepository.save(recruiter);
      }

      // Crear e insertar el usuario utilizando los datos proporcionados
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      savedUsers.push(savedUser);
    }

    return savedUsers;
  }
}
