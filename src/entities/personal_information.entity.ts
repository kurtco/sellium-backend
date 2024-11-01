import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  insured: boolean;

  @Column({ nullable: true })
  phoneCode: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  productType: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  homeAddress: string;

  @Column({ nullable: true })
  businessAddress: string;

  @Column({ nullable: true })
  spouseName: string;

  @Column({ nullable: false })
  userCode: string;

  @OneToOne(() => User, (user) => user.personalInformation)
  @JoinColumn({ name: "userCode", referencedColumnName: "userCode" })
  user: User;
}
