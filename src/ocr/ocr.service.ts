import { HttpStatus, Injectable } from "@nestjs/common";
import {
  DataFromImage,
  HttpErrorResponse,
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
import {
  OcrServiceResponses,
  OcrServiceStatus,
  RepresentativeType,
} from "src/interfaces/enums";
import { processImageWithDocumentAI } from "src/utils/documentAIUtils";

@Injectable()
export class OcrService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User> // Inyecta el repositorio
  ) {}
  currentUserCode: string = "";

  async convertToBase64(file: Express.Multer.File): Promise<string> {
    return file.buffer.toString("base64"); // convert the imageto base64 text
  }

  async processImage(imageBase64: string): Promise<ProcessImageResponse> {
    try {
      const extractedData: DataFromImage =
        await processImageWithDocumentAI(imageBase64);

      this.currentUserCode = extractedData.userCode;

      // Verificar si el usuario reclutado ya existe utilizando la función existente
      const isUserExist = await this.validateUserCodeExistence(
        extractedData.userCode
      );
      const isUserRepresentative = this.validatePosition(
        extractedData.position
      );
      if (!isUserExist && !isUserRepresentative) {
        let recruiter = await this.userRepository.findOne({
          where: { userCode: extractedData.recruiterCode },
        });

        // If the recruiter (reclutador) does not exist, create a new record for him/her
        if (!recruiter) {
          recruiter = this.userRepository.create({
            userCode: String(extractedData.recruiterCode),
            userName: extractedData.recruiterName,
            leaderName: extractedData.leaderName,
            leaderCode: extractedData.leaderCode,
          });
          await this.userRepository.save(recruiter);
        }
        const user = this.userRepository.create(extractedData);
        await this.userRepository.save(user);
      }

      return {
        data: extractedData,
      } as HttpSuccessResponse<DataFromImage>;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage === OcrServiceStatus.BadImage) {
        return handleError(
          error,
          OcrServiceResponses.BadImage,
          HttpStatus.BAD_REQUEST
        );
      }

      if (errorMessage === OcrServiceStatus.Conflict) {
        return handleError(
          error,
          OcrServiceResponses.Conflict,
          HttpStatus.CONFLICT,
          this.currentUserCode
        );
      } else if (errorMessage === OcrServiceStatus.UserRepresentiveType) {
        return handleError(
          error,
          OcrServiceResponses.UserRepresentiveType,
          HttpStatus.UNPROCESSABLE_ENTITY,
          this.currentUserCode
        );
      } else {
        return handleError(error, OcrServiceStatus.Default);
      }
    }
  }

  private validatePosition(position: string): boolean {
    if (position === RepresentativeType.Representative) {
      throw new Error(String(OcrServiceStatus.UserRepresentiveType));
    }

    return false;
  }

  private async validateUserCodeExistence(
    userCode: string
  ): Promise<HttpErrorResponse | boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { userCode },
    });

    if (existingUser) {
      throw new Error(String(OcrServiceStatus.Conflict));
    }

    return false;
  }

  // private updateRecruitFields(
  //   recruit: DataFromImage,
  //   extractedData: DataFromImage
  // ): void {
  //   recruit.recruiterName =
  //     recruit.recruiterName || extractedData.recruiterName;
  //   recruit.leaderCode = recruit.leaderCode || extractedData.leaderCode;
  //   recruit.leaderName = recruit.leaderName || extractedData.leaderName;
  //   recruit.startDate = recruit.startDate || extractedData.startDate;
  //   recruit.birthDate = recruit.birthDate || extractedData.birthDate;
  //   recruit.phone = recruit.phone || extractedData.phone;
  //   recruit.email = recruit.email || extractedData.email;
  //   recruit.homeAddress = recruit.homeAddress || extractedData.homeAddress;
  //   recruit.businessAddress =
  //     recruit.businessAddress || extractedData.businessAddress;
  //   recruit.spouseName = recruit.spouseName || extractedData.spouseName;
  //   recruit.userName = recruit.userName || extractedData.userName;
  //   recruit.position = recruit.position || extractedData.position;
  //   recruit.recruiterCode =
  //     recruit.recruiterCode || extractedData.recruiterCode;
  //   recruit.userCode = recruit.userCode || extractedData.userCode;
  // }
}
