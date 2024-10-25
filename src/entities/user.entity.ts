import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";
import { PersonalInformation } from "./personal_information.entity";
import { JobInformation } from "./job_information.entity";
import { LicenseAndTrainings } from "./license_and_trainings.entity";
import { Progress } from "./progress.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  recruiterName: string;

  @Column()
  leaderName: string;

  @Column()
  leaderCode: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  position: string;

  // recruiterCode field, required but not unique
  @Column({ nullable: true, type: "varchar" })
  recruiterCode: string;

  // userCode field, required and unique
  @Column({ nullable: true, type: "varchar", unique: true })
  userCode: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  homeAddress: string;

  @Column({ nullable: true })
  businessAddress: string;

  @Column({ nullable: true })
  spouseName: string;

  // Relación opcional con la tabla PersonalInformation (One-to-One)
  @OneToOne(() => PersonalInformation, { nullable: true })
  @JoinColumn()
  personalInformation?: PersonalInformation;

  // Relación opcional con JobInformation (One-to-One)
  @OneToOne(() => JobInformation, { nullable: true })
  @JoinColumn()
  jobInformation?: JobInformation;

  // Relación opcional con Progress (One-to-One)
  @OneToOne(() => Progress, { nullable: true })
  @JoinColumn()
  progress?: Progress;

  // Relación opcional con LicenseAndTrainings (One-to-Many)
  @OneToMany(() => LicenseAndTrainings, (training) => training.user, {
    nullable: true,
  })
  licensesAndTrainings?: LicenseAndTrainings[];

  // Relación recursiva con otros usuarios
  @ManyToOne(() => User, (user) => user.recruits) //This indicates that many users may be related to a single recruiter.
  //  @JoinColumn({ name: "recruiterCode", referencedColumnName: "userCode" })
  @JoinColumn({ name: "recruiterCode", referencedColumnName: "userCode" }) //  userCode as reference
  recruiter: User; // this column represents the recluiter  of  a user (userCode),

  // Inverse relationship for the recruits
  @OneToMany(() => User, (user) => user.recruiter) // This annotation indicates that one user (the recruiter) can have many recruits.
  recruits: User[]; // This column allows access to users recruited by a specific recruiter.
}
