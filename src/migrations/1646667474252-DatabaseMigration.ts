import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646667474252 implements MigrationInterface {
  name = "DatabaseMigration1646667474252";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "statusAfterUltrasound"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "reasonCancel" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "reasonCancel" text NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "ticket" ADD "cancelReason" text');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_statusmalepet_enum\" AS ENUM('CANCELED', 'NOT_AVAILABLE', 'AVAILABLE', 'READY', 'NOT_READY', 'RETURNED', 'PAYMENT')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "statusMalePet" "public"."breeding_transaction_statusmalepet_enum" NOT NULL DEFAULT \'NOT_AVAILABLE\'',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_statusfemalepet_enum\" AS ENUM('CANCELED', 'NOT_AVAILABLE', 'AVAILABLE', 'READY', 'NOT_READY', 'RETURNED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "statusFemalePet" "public"."breeding_transaction_statusfemalepet_enum" NOT NULL DEFAULT \'NOT_AVAILABLE\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "reasonCancel" text NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "status"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_status_enum\" AS ENUM('CANCELED', 'PUBLISHED', 'EXPIRED', 'DEPOSITED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "status" "public"."post_status_enum" NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "status"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_status_enum\" AS ENUM('DELETED', 'NOT_VERIFIED', 'VERIFIED', 'IN_POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD "status" "public"."pet_status_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "status"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum\" AS ENUM('PET_AVAILABLE', 'NOT_PET_AVAILABLE', 'RECEIVED', 'NOT_RECEIVED', 'PAYMENTED')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "status" "public"."sale_transaction_status_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-07T15:37:57.093Z"\'',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "status"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_status_enum\" AS ENUM('REQUESTED', 'CANCELLED', 'CONFIRMED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD "status" "public"."ticket_status_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "status"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum\" AS ENUM('CANCEL', 'NOT_STARTED', 'PAYMENTED', 'PROCESSING', 'FINISHED', 'WAITING', 'NOT_ULTRASOUND', 'PREGNANT', 'NOT_PREGNANT')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "status" "public"."breeding_transaction_status_enum" NOT NULL DEFAULT \'NOT_STARTED\'',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "status"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum\" AS ENUM('SUCCESS', 'INFOMATION_ERROR', 'BILLING_ERROR')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."order_status_enum"');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "status"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "status" boolean NOT NULL DEFAULT false',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."ticket_status_enum"');
    await queryRunner.query('ALTER TABLE "ticket" ADD "status" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-04\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "status"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."pet_status_enum"');
    await queryRunner.query(
      'ALTER TABLE "pet" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."post_status_enum"');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "reasonCancel"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "statusFemalePet"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_statusfemalepet_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "statusMalePet"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_statusmalepet_enum"',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "cancelReason"');
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "reasonCancel"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "reasonCancel"');
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "statusAfterUltrasound" boolean NOT NULL DEFAULT false',
    );
  }
}
