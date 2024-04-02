import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1712035654235 implements MigrationInterface {
    name = 'Mig1712035654235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "varString"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "varNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "varNumber" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "varString" character varying`);
    }

}
