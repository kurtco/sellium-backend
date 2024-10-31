import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class LicenseAndTrainings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  licenseType: string;

  @Column({ nullable: true })
  expires: string;

  @Column({ nullable: true })
  fastStar: boolean;

  // License Exam
  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  presented: string;

  @Column({ nullable: true })
  approved: boolean;

  // Trainings
  @Column({ nullable: true })
  orientation1: boolean;

  @Column({ nullable: true })
  orientation2: boolean;

  @Column({ nullable: true })
  orientation3: boolean;

  @Column({ nullable: true })
  orientation4: boolean;

  @Column({ nullable: true })
  bootCamp: boolean;

  @Column({ nullable: false })
  userCode: string;

  @ManyToOne(() => User, (user) => user.licensesAndTrainings)
  @JoinColumn({ name: "userCode", referencedColumnName: "userCode" })
  user: User;
}
