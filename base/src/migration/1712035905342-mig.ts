import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1712035905342 implements MigrationInterface {
    name = 'Mig1712035905342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base" DROP COLUMN "age"`);
    }

}
