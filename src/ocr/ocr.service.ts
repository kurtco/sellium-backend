import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DataFromImage,
  HttpSuccessResponse,
  ProcessImageResponse,
} from "src/interfaces/interfaces";
import {
  client,
  projectId,
  location,
  processorId,
  getProcessorName,
} from "src/config/constants";

@Injectable()
export class OcrService {
  constructor(private configService: ConfigService) {}
  async processImage(imageBase64: string): Promise<ProcessImageResponse> {
    const name = getProcessorName();
    const cleanBase64 = imageBase64.replace(
      /^data:image\/(png|jpeg);base64,/,
      ""
    );

    const request = {
      name,
      rawDocument: {
        content: cleanBase64, // Usar el base64 limpio
        mimeType: "image/png", // O el tipo de imagen adecuado
      },
    };

    const [result] = await client.processDocument(request);

    const entities = result.document.entities;

    const extractedData: DataFromImage = {
      recruiter: "",
      leader: "",
      startDate: "",
      birthDate: "",
      phone: "",
      email: "",
      homeAddress: "",
      businessAddress: "",
      spouse: "",
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
          extractedData.recruiter = entity.mentionText;
          break;
        case "birthDate":
          extractedData.birthDate = entity.mentionText;
          break;
        case "leader":
          extractedData.leader = entity.mentionText;
          break;
        case "email":
          extractedData.email = entity.mentionText;
          break;
        case "homeAddress":
          extractedData.homeAddress = entity.mentionText?.replace(/\n/g, " ");
          break;
        case "spouse":
          extractedData.spouse = entity.mentionText;
          break;
        case "userName":
          extractedData.userName = entity.mentionText;
          break;
        case "position":
          extractedData.position = entity.mentionText;
          break;
        case "recruiterCode":
          extractedData.recruiterCode = entity.mentionText;
          break;
        case "startDate":
          extractedData.startDate = entity.mentionText;
          break;
        case "userCode":
          extractedData.userCode = entity.mentionText;
          break;
        default:
          break;
      }
    });

    return { data: extractedData } as HttpSuccessResponse;
  }
}
