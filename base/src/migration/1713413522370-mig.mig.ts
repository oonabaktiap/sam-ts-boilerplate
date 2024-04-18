import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1713413522370 implements MigrationInterface {
    name = 'Mig1713413522370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_payment_config" ("createdAt" date, "updatedAt" date, "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "product_mapping_config_id" integer, "provider" character varying, "paymentConfig" json, "insureMoPortalId" integer, "isActive" boolean, CONSTRAINT "PK_04cd6a3a1c13b5bbd0f10eed062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_mapping_config" ("id" SERIAL NOT NULL, "fCode" character varying, "productCode" character varying, "planCode" character varying, CONSTRAINT "PK_10f501da9bc3d0006f00a1cb33e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_transaction_paymentstatus_enum" AS ENUM('new', 'failed', 'paid')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_transaction_issuancestatus_enum" AS ENUM('new', 'failed', 'issued', 'null')`);
        await queryRunner.query(`CREATE TABLE "payment_transaction" ("createdAt" date, "updatedAt" date, "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "paymentReferenceNo" character varying, "productPaymentConfigId" integer, "transactionId" uuid DEFAULT uuid_generate_v4(), "paymentStatus" "public"."payment_transaction_paymentstatus_enum" NOT NULL DEFAULT 'new', "issuanceStatus" "public"."payment_transaction_issuancestatus_enum" NOT NULL DEFAULT 'new', "paymentGatewayRequest" json, "paymentGatewayResponse" json, "IssuanceReferenceNo" character varying, "additionalInfo" json, "submittedAt" date, CONSTRAINT "PK_82c3470854cf4642dfb0d7150cd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment_transaction"`);
        await queryRunner.query(`DROP TYPE "public"."payment_transaction_issuancestatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_transaction_paymentstatus_enum"`);
        await queryRunner.query(`DROP TABLE "product_mapping_config"`);
        await queryRunner.query(`DROP TABLE "product_payment_config"`);
    }

}
