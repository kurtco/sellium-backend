import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDetails1729538663842 implements MigrationInterface {
    name = 'UserDetails1729538663842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personal_information" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" TIMESTAMP, "insured" character varying, "productType" character varying, "phone" character varying, "email" character varying, "homeAddress" character varying, "businessAddress" character varying, "spouseName" character varying, CONSTRAINT "PK_b870ed544fc4806dfeb05750237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_information" ("id" SERIAL NOT NULL, "position" character varying, "promotionDate" TIMESTAMP, "personalCode" character varying, "partOfCompanySince" TIMESTAMP, "eAndO" boolean, "appointed" text, CONSTRAINT "PK_5e45967d54d3495d9ce251b4454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "license_and_trainings" ("id" SERIAL NOT NULL, "licenseType" character varying, "expires" TIMESTAMP, "fastStar" boolean, "state" character varying, "presented" TIMESTAMP, "approved" boolean, "orientation1" boolean, "orientation2" boolean, "orientation3" boolean, "orientation4" boolean, "bootCamp" boolean, "userId" integer, CONSTRAINT "PK_c8e290bfb2c9d57a1a26be8c0c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "progress" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "januaryPoints" integer, "januaryPercentage" integer, "februaryPoints" integer, "februaryPercentage" integer, "marchPoints" integer, "marchPercentage" integer, "aprilPoints" integer, "aprilPercentage" integer, "mayPoints" integer, "mayPercentage" integer, "junePoints" integer, "junePercentage" integer, "julyPoints" integer, "julyPercentage" integer, "augustPoints" integer, "augustPercentage" integer, "septemberPoints" integer, "septemberPercentage" integer, "octoberPoints" integer, "octoberPercentage" integer, "novemberPoints" integer, "novemberPercentage" integer, "decemberPoints" integer, "decemberPercentage" integer, "numberOfAgents" integer, "numberOfPoliciesSold" integer, "isCoach" boolean, "netLicense" boolean, "userId" integer, CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "recruiterName" character varying, "leaderName" character varying NOT NULL, "leaderCode" character varying NOT NULL, "userName" character varying, "position" character varying, "recruiterCode" character varying, "userCode" character varying, "startDate" TIMESTAMP, "birthDate" TIMESTAMP, "phone" character varying, "email" character varying, "homeAddress" character varying, "businessAddress" character varying, "spouseName" character varying, "personalInformationId" integer, "jobInformationId" integer, "progressId" integer, CONSTRAINT "UQ_6bd3b94c05cc2bd28326e542279" UNIQUE ("userCode"), CONSTRAINT "REL_3f04cee14c74af225aeb27f722" UNIQUE ("personalInformationId"), CONSTRAINT "REL_29944ac0d18f9ad5c62e6793a6" UNIQUE ("jobInformationId"), CONSTRAINT "REL_4d236e6fe6fa639c039f6aabca" UNIQUE ("progressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "license_and_trainings" ADD CONSTRAINT "FK_ae47e17188987713c2ee126b88c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress" ADD CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_3f04cee14c74af225aeb27f722a" FOREIGN KEY ("personalInformationId") REFERENCES "personal_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_29944ac0d18f9ad5c62e6793a6e" FOREIGN KEY ("jobInformationId") REFERENCES "job_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4d236e6fe6fa639c039f6aabca6" FOREIGN KEY ("progressId") REFERENCES "progress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bedce6d1b21105da44aceeaa727" FOREIGN KEY ("recruiterCode") REFERENCES "user"("userCode") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bedce6d1b21105da44aceeaa727"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4d236e6fe6fa639c039f6aabca6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_29944ac0d18f9ad5c62e6793a6e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_3f04cee14c74af225aeb27f722a"`);
        await queryRunner.query(`ALTER TABLE "progress" DROP CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35"`);
        await queryRunner.query(`ALTER TABLE "license_and_trainings" DROP CONSTRAINT "FK_ae47e17188987713c2ee126b88c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "progress"`);
        await queryRunner.query(`DROP TABLE "license_and_trainings"`);
        await queryRunner.query(`DROP TABLE "job_information"`);
        await queryRunner.query(`DROP TABLE "personal_information"`);
    }

}
