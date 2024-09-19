import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "./storage.service";

@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  // Endpoint para subir una imagen
  @Post("upload")
  @UseInterceptors(FileInterceptor("file")) // Interceptor para manejar la carga de archivos
  async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    // Llama al servicio para subir el archivo y obtener la URL pública
    const imageUrl = await this.storageService.uploadFile(file);
    return imageUrl; // Devuelve la URL pública de la imagen
  }
}
