import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Progress } from "src/entities/progress.entity";
import { CreateProgressDto } from "src/users/dto/create-progress.dto";

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>
  ) {}

  // Método para crear o actualizar el progreso
  async saveOrUpdate(createProgressDto: CreateProgressDto): Promise<Progress> {
    const { userCode, year, ...rest } = createProgressDto;

    // Paso 1: Verificar si existe un registro con el userCode y el año especificado
    let progressRecord = await this.progressRepository.findOne({
      where: { userCode, year },
    });

    if (progressRecord) {
      // Si existe, actualizamos el registro con los datos nuevos
      this.progressRepository.merge(progressRecord, rest);
    } else {
      // Si no existe, creamos uno nuevo
      progressRecord = this.progressRepository.create({
        userCode,
        year,
        ...rest,
      });
    }

    // Guardamos el registro (ya sea nuevo o actualizado)
    return this.progressRepository.save(progressRecord);
  }
}
