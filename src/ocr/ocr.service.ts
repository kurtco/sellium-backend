import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as documentai from '@google-cloud/documentai';
import { DataFromImage } from 'src/interfaces/interfaces';

@Injectable()
export class OcrService {
  constructor(private configService: ConfigService) {}
  async processImage(imageBase64: string): Promise<DataFromImage> {
    const client = new documentai.DocumentProcessorServiceClient({
      keyFilename: 'src/config/sellium-435318-9d9be02cc538.json', // Ruta a tus credenciales JSON
    });

    const projectId = this.configService.get('PROJECT_ID');
    const location = this.configService.get('LOCATION');
    const processorId = this.configService.get('PROCESSOR_ID');
    const name = client.processorPath(projectId, location, processorId);

    // Limpiar el base64
    const cleanBase64 = imageBase64.replace(
      /^data:image\/(png|jpeg);base64,/,
      '',
    );

    const request = {
      name,
      rawDocument: {
        content: cleanBase64, // Usar el base64 limpio
        mimeType: 'image/png', // O el tipo de imagen adecuado
      },
    };

    const [result] = await client.processDocument(request);

    const entities = result.document.entities;

    const extractedData: DataFromImage = {
      recruiter: '',
      leader: '',
      startDate: '',
      birthDate: '',
      phone: '',
      email: '',
      homeAddress: '',
      businessAddress: '',
      spouse: '',
      userName: '',
      position: '',
      recruiterCode: '',
      userCode: '',
    };

    // Iteramos sobre las entidades para obtener los valores
    entities.forEach((entity) => {
      switch (entity.type) {
        case 'phone':
          extractedData.phone = entity.mentionText;
          break;
        case 'businessAddress':
          extractedData.businessAddress = entity.mentionText?.replace(
            /\n/g,
            ' ',
          );
          break;
        case 'recruiter':
          extractedData.recruiter = entity.mentionText;
          break;
        case 'birthDate':
          extractedData.birthDate = entity.mentionText;
          break;
        case 'leader':
          extractedData.leader = entity.mentionText;
          break;
        case 'email':
          extractedData.email = entity.mentionText;
          break;
        case 'homeAddress':
          extractedData.homeAddress = entity.mentionText?.replace(/\n/g, ' ');
          break;
        case 'spouse':
          extractedData.spouse = entity.mentionText;
          break;
        case 'userName':
          extractedData.userName = entity.mentionText;
          break;
        case 'position':
          extractedData.position = entity.mentionText;
          break;
        case 'recruiterCode':
          extractedData.recruiterCode = entity.mentionText;
          break;
        case 'startDate':
          extractedData.startDate = entity.mentionText;
          break;
        case 'userCode':
          extractedData.userCode = entity.mentionText;
          break;
        default:
          break;
      }
    });

    return extractedData;
  }
}
