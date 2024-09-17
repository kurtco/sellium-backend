import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1726523404733 implements MigrationInterface {
    name = 'CreateUser1726523404733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "recruiterName" character varying, "leaderName" character varying NOT NULL, "startDate" TIMESTAMP, "birthDate" TIMESTAMP, "phone" character varying, "email" character varying, "homeAddress" character varying, "businessAddress" character varying, "spouseName" character varying, "userName" character varying, "position" character varying, "recruiterCode" character varying, "userCode" character varying, CONSTRAINT "UQ_6bd3b94c05cc2bd28326e542279" UNIQUE ("userCode"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bedce6d1b21105da44aceeaa727" FOREIGN KEY ("recruiterCode") REFERENCES "user"("userCode") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bedce6d1b21105da44aceeaa727"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
