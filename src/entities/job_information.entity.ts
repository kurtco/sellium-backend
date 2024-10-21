import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class JobInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  position: string; // Posición del usuario

  @Column({ nullable: true })
  promotionDate: Date; // Fecha de promoción

  @Column({ nullable: true })
  personalCode: string; // Código personal

  @Column({ nullable: true })
  partOfCompanySince: Date; // Parte de la compañía desde

  @Column({ nullable: true })
  eAndO: boolean; // E&O (Sí/No)

  @Column({ nullable: true, type: "text" })
  appointed: string; // Compañías designadas (puede ser texto largo)

  // Relación con User (One-to-One)
  @OneToOne(() => User, (user) => user.jobInformation)
  user: User; // Clave foránea vinculada a la tabla User
}
