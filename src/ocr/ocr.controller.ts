import { ProcessImageResponse } from "src/interfaces/interfaces";
import { TransformInterceptor } from "./../utils/TransformInterceptor";
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { OcrService } from "./ocr.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("ocr")
@UseInterceptors(TransformInterceptor)
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post("process")
  async processImage(
    @Body("imageBase64") imageBase64: string
  ): Promise<ProcessImageResponse> {
    return await this.ocrService.processImage(imageBase64);
  }

  @Post("imagetobase64")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    const base64 = await this.ocrService.convertToBase64(file);
    return base64; // Return just text as base64
  }

  @Post("pdf-to-base64")
  @UseInterceptors(FileInterceptor("file"))
  async convertPdfToBase64(
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    console.log(file); // Asegúrate de que el archivo esté llegando
    if (file.mimetype !== "application/pdf") {
      throw new BadRequestException("The file is not a PDF.");
    }
    return await this.ocrService.convertToBase64(file);
  }

  @Post("process-pdf")
  async processPdf(@Body("pdfBase64") pdfBase64: string): Promise<any> {
    if (!pdfBase64) {
      throw new BadRequestException("There is not a base64 to process");
    }

    // Procesa directamente el Base64
    return await this.ocrService.processPdf(pdfBase64);
  }
}
