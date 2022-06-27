import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigration1656318381304 implements MigrationInterface {
  name = "DBMigration1656318381304";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentForMalePetOwnerTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentForBranchTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentTime" TIMESTAMP',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentForBranchTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentForMalePetOwnerTime" TIMESTAMP',
    );
  }
}
