import { ProcessImageResponse } from "src/interfaces/interfaces";
import { TransformInterceptor } from "./../utils/TransformInterceptor";
import { Controller, Post, Body, UseInterceptors } from "@nestjs/common";
import { OcrService } from "./ocr.service";

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
}
