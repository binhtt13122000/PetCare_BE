import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1657605493606 implements MigrationInterface {
  name = "DBMigrate1657605493606";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_d61d07f4459785d2483de1ccbbe"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_772f6c9d5b02697c47ee9654f4b"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "description"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "sellerReceive"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "transactionFee"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "transactionTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "paymentMethod"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "branchId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP COLUMN "paymentMethod"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."pet_combo_paymentmethod_enum"',
    );
    await queryRunner.query('ALTER TABLE "pet_combo" DROP COLUMN "orderTotal"');
    await queryRunner.query('ALTER TABLE "pet_combo" DROP COLUMN "point"');
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "sellerReceive"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "pickupFemalePetTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "description"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentMethod"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "branchId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionFee"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "self"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "servicePoint"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realDateOfBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realDateOfFinish"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realTimeToCheckBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "starBranch"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "reviewBranch"',
    );
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "star"');
    await queryRunner.query(
      'ALTER TABLE "customer" DROP COLUMN "numberReviewers"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" DROP COLUMN "vaccineDescription"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "approveTime"');
    await queryRunner.query(
      'ALTER TABLE "post" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "rejectTime"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "isVaccineInject"');
    await queryRunner.query('ALTER TABLE "branch" DROP COLUMN "star"');
    await queryRunner.query(
      'ALTER TABLE "branch" DROP COLUMN "numberReviewers"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "dateOfFinish" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "transactionTotal" integer NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" DROP COLUMN "transactionTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "dateOfFinish"',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" ADD "numberReviewers" integer DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" ADD "star" double precision NOT NULL DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "isVaccineInject" boolean NOT NULL DEFAULT false',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "rejectTime" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "approveTime" TIMESTAMP');
    await queryRunner.query('ALTER TABLE "pet" ADD "vaccineDescription" text');
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "numberReviewers" integer DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "star" double precision NOT NULL DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "reviewBranch" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "starBranch" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realTimeToCheckBreeding" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realDateOfFinish" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realDateOfBreeding" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "servicePoint" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "self" boolean DEFAULT false',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionFee" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "branchId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentMethod" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "description" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "pickupFemalePetTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "sellerReceive" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet_combo" ADD "point" integer');
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD "orderTotal" integer NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_combo_paymentmethod_enum\" AS ENUM('CASH', 'VNPAY')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD "paymentMethod" "public"."pet_combo_paymentmethod_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "branchId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "paymentMethod" text',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "transactionTotal" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "transactionFee" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "sellerReceive" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "description" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_772f6c9d5b02697c47ee9654f4b" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_d61d07f4459785d2483de1ccbbe" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
