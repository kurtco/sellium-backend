import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
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

  @Column({ nullable: false })
  userCode: string;

  @OneToOne(() => User, (user) => user.jobInformation)
  @JoinColumn({ name: "userCode", referencedColumnName: "userCode" })
  user: User;
}
