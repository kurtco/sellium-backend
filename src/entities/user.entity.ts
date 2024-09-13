import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recruiterName: string;

  @Column()
  leaderName: string;

  @Column()
  startDate: Date;

  @Column()
  birthDate: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  homeAddress: string;

  @Column()
  businessAddress: string;

  @Column()
  spouseName: string;

  @Column()
  username: string;

  @Column()
  position: string;

  // recruiterCode field, required and unique
  @Column({ unique: true })
  recruiterCode: string;

  // userCode field, required and unique
  @Column({ unique: true })
  userCode: string;

  // Recursive relationship with the same User entity
  // @ManyToOne(() => User, (user) => user.recruits)
  // @JoinColumn({ name: "recruiterCode", referencedColumnName: "userCode" })
  // recruiter: User; // this column represents the recluiter  of  a user (userCode),

  //  Inverse relationship for the recruits
  // recruits: User[]; // This column allows access to users recruited by a specific recruiter.
}
