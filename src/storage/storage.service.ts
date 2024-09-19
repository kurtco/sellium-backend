import { Injectable } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucketName = process.env.GCS_BUCKET_NAME; // Nombre del bucket de Google Cloud Storage

  constructor() {
    // Inicializar Google Cloud Storage usando las credenciales desde las variables de entorno
    this.storage = new Storage({
      credentials: JSON.parse(
        Buffer.from(
          process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
          "base64"
        ).toString("utf8")
      ),
    });
  }

  // Método para subir el archivo a Google Cloud Storage
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const filename = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(filename);

    // Crear un stream para subir el archivo
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Establece el tipo de contenido (MIME type)
      },
    });

    return new Promise((resolve, reject) => {
      stream.on("error", (err) => reject(err));

      stream.on("finish", async () => {
        // Hacer que el archivo sea público
        await fileUpload.makePublic();

        // Retornar la URL pública del archivo subido
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
        resolve(publicUrl);
      });

      // Subir el contenido del archivo
      stream.end(file.buffer);
    });
  }
}
