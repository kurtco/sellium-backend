import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
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
  dateOfBirth: Date;

  @Column({ nullable: true })
  insured: string;

  @Column({ nullable: true })
  productType: string;

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

  // Relación con User (One-to-One)
  @OneToOne(() => User, (user) => user.personalInformation)
  user: User; // Clave foránea vinculada a la tabla User
}
