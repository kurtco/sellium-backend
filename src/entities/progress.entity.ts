import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number; // El año específico de este progreso (por ejemplo, 2024)

  // Puntos y porcentaje por mes
  @Column({ nullable: true })
  januaryPoints: number;

  @Column({ nullable: true })
  januaryPercentage: number;

  @Column({ nullable: true })
  februaryPoints: number;

  @Column({ nullable: true })
  februaryPercentage: number;

  @Column({ nullable: true })
  marchPoints: number;

  @Column({ nullable: true })
  marchPercentage: number;

  @Column({ nullable: true })
  aprilPoints: number;

  @Column({ nullable: true })
  aprilPercentage: number;

  @Column({ nullable: true })
  mayPoints: number;

  @Column({ nullable: true })
  mayPercentage: number;

  @Column({ nullable: true })
  junePoints: number;

  @Column({ nullable: true })
  junePercentage: number;

  @Column({ nullable: true })
  julyPoints: number;

  @Column({ nullable: true })
  julyPercentage: number;

  @Column({ nullable: true })
  augustPoints: number;

  @Column({ nullable: true })
  augustPercentage: number;

  @Column({ nullable: true })
  septemberPoints: number;

  @Column({ nullable: true })
  septemberPercentage: number;

  @Column({ nullable: true })
  octoberPoints: number;

  @Column({ nullable: true })
  octoberPercentage: number;

  @Column({ nullable: true })
  novemberPoints: number;

  @Column({ nullable: true })
  novemberPercentage: number;

  @Column({ nullable: true })
  decemberPoints: number;

  @Column({ nullable: true })
  decemberPercentage: number;

  // Agentes reclutados y pólizas vendidas
  @Column({ nullable: true })
  numberOfAgents: number;

  @Column({ nullable: true })
  numberOfPoliciesSold: number;

  // Achievements
  @Column({ nullable: true })
  isCoach: boolean;

  @Column({ nullable: true })
  netLicense: boolean;

  // Relación Many-to-One con el usuario
  @ManyToOne(() => User, (user) => user.progress)
  user: User; // Clave foránea vinculada a la tabla User
}
