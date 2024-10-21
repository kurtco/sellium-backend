import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class LicenseAndTrainings {
  @PrimaryGeneratedColumn()
  id: number;

  // License Details
  @Column({ nullable: true })
  licenseType: string; // Tipo de licencia

  @Column({ nullable: true })
  expires: Date; // Fecha de expiración

  @Column({ nullable: true })
  fastStar: boolean; // Fast Star (Sí/No)

  // License Exam
  @Column({ nullable: true })
  state: string; // Estado donde se tomó el examen

  @Column({ nullable: true })
  presented: Date; // Fecha en que se presentó el examen

  @Column({ nullable: true })
  approved: boolean; // Aprobado (Sí/No)

  // Trainings
  @Column({ nullable: true })
  orientation1: boolean; // Orientación 1

  @Column({ nullable: true })
  orientation2: boolean; // Orientación 2

  @Column({ nullable: true })
  orientation3: boolean; // Orientación 3

  @Column({ nullable: true })
  orientation4: boolean; // Orientación 4

  @Column({ nullable: true })
  bootCamp: boolean; // Boot Camp (Sí/No)

  // Relación Many-to-One con User
  @ManyToOne(() => User, (user) => user.licensesAndTrainings)
  user: User; // Clave foránea vinculada a la tabla User
}
