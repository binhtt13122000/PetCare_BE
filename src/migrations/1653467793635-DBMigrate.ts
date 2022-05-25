import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653467793635 implements MigrationInterface {
  name = "DBMigrate1653467793635";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-25T08:36:37.485Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionFee" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "provisionalTotal" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "discount" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionTotal" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "star" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "star" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionTotal" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "discount" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "provisionalTotal" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionFee" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-24 05:59:29.883\'',
    );
  }
}
