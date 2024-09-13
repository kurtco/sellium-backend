import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { DataFromImage } from 'src/interfaces/interfaces';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process')
  async processImage(
    @Body('imageBase64') imageBase64: string,
  ): Promise<DataFromImage> {
    return await this.ocrService.processImage(imageBase64);
  }
}
