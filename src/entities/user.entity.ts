import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

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

  // Recursive relationship with the same User entity

  @ManyToOne(() => User, (user) => user.recruits) //This indicates that many users may be related to a single recruiter.
  //  @JoinColumn({ name: "recruiterCode", referencedColumnName: "userCode" })
  @JoinColumn({ name: "recruiterCode", referencedColumnName: "userCode" }) //  userCode as reference
  recruiter: User; // this column represents the recluiter  of  a user (userCode),

  // Inverse relationship for the recruits
  @OneToMany(() => User, (user) => user.recruiter) // This annotation indicates that one user (the recruiter) can have many recruits.
  recruits: User[]; // This column allows access to users recruited by a specific recruiter.
}
