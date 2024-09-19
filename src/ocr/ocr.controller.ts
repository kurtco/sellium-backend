import { ProcessImageResponse } from "src/interfaces/interfaces";
import { TransformInterceptor } from "./../utils/TransformInterceptor";
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
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
}
