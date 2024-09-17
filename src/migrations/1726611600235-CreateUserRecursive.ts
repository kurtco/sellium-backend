import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRecursive1726611600235 implements MigrationInterface {
    name = 'CreateUserRecursive1726611600235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "leaderCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "leaderCode"`);
    }

}
