import { Injectable } from "@nestjs/common";
import {
  DataFromImage,
  HttpSuccessResponse,
  ProcessImageResponse,
} from "src/interfaces/interfaces";
import {
  client,
  getProcessorName,
  ProcessingBase64,
} from "src/config/constants";
import { handleError } from "src/utils/HandleError";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class OcrService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User> // Inyecta el repositorio
  ) {}
  async processImage(imageBase64: string): Promise<ProcessImageResponse> {
    try {
      const extractedData: DataFromImage =
        await this.processImageWithDocumentAI(imageBase64);

      // Verify if the  recruiter (reclutador) already exist
      let recruiter = await this.userRepository.findOne({
        where: { userCode: extractedData.recruiterCode },
      });

      // If the recruiter (reclutador) does not exist, create a new record for him/her
      if (!recruiter) {
        recruiter = this.userRepository.create({
          userCode: String(extractedData.recruiterCode),
          userName: extractedData.recruiterName,
          leaderName: extractedData.leaderName,
        });
        await this.userRepository.save(recruiter);
      }

      // Check if the recruit (usuario reclutado) already exists
      let recruit = await this.userRepository.findOne({
        where: { userCode: extractedData.userCode },
      });

      if (!recruit) {
        // creating the new recruit
        const user = this.userRepository.create(extractedData);
        await this.userRepository.save(user);
      }

      return { data: extractedData } as HttpSuccessResponse<DataFromImage>;
    } catch (error) {
      return handleError(error, "Failed to process image");
    }
  }

  private async processImageWithDocumentAI(
    base64image: string
  ): Promise<DataFromImage> {
    const cleanBase64 = ProcessingBase64(base64image);
    const name = getProcessorName();
    const request = {
      name,
      rawDocument: {
        content: cleanBase64,
        mimeType: "image/png",
      },
    };
    const [result] = await client.processDocument(request);

    const entities = result.document.entities;

    const extractedData: DataFromImage = {
      recruiterName: "",
      leaderName: "",
      phone: "",
      email: "",
      homeAddress: "",
      businessAddress: "",
      spouseName: "",
      userName: "",
      position: "",
      recruiterCode: "",
      userCode: "",
    };

    // Iteramos sobre las entidades para obtener los valores
    entities.forEach((entity) => {
      switch (entity.type) {
        case "phone":
          extractedData.phone = entity.mentionText;
          break;
        case "businessAddress":
          extractedData.businessAddress = entity.mentionText?.replace(
            /\n/g,
            " "
          );
          break;
        case "recruiter":
          extractedData.recruiterName = entity.mentionText;
          break;
        case "birthDate":
          extractedData.birthDate = new Date(entity.mentionText);
          break;
        case "leader":
          extractedData.leaderName = entity.mentionText;
          break;
        case "email":
          extractedData.email = entity.mentionText;
          break;
        case "homeAddress":
          extractedData.homeAddress = entity.mentionText?.replace(/\n/g, " ");
          break;
        case "spouse":
          extractedData.spouseName = entity.mentionText;
          break;
        case "userName":
          extractedData.userName = entity.mentionText;
          break;
        case "position":
          extractedData.position = entity.mentionText;
          break;
        case "recruiterCode":
          extractedData.recruiterCode = String(entity.mentionText);
          break;
        case "startDate":
          extractedData.startDate = new Date(entity.mentionText);
          break;
        case "userCode":
          extractedData.userCode = String(entity.mentionText);
          break;
        default:
          break;
      }
    });
    return extractedData;
  }
}
