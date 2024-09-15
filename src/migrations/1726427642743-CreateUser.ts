import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1726427642743 implements MigrationInterface {
    name = 'CreateUser1726427642743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "recruiterName" character varying NOT NULL, "leaderName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "birthDate" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "homeAddress" character varying NOT NULL, "businessAddress" character varying NOT NULL, "spouseName" character varying NOT NULL, "username" character varying NOT NULL, "position" character varying NOT NULL, "recruiterCode" character varying NOT NULL, "userCode" character varying NOT NULL, CONSTRAINT "UQ_bedce6d1b21105da44aceeaa727" UNIQUE ("recruiterCode"), CONSTRAINT "UQ_6bd3b94c05cc2bd28326e542279" UNIQUE ("userCode"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bedce6d1b21105da44aceeaa727" FOREIGN KEY ("recruiterCode") REFERENCES "user"("userCode") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bedce6d1b21105da44aceeaa727"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
