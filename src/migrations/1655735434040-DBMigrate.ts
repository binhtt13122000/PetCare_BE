import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655735434040 implements MigrationInterface {
  name = "DBMigrate1655735434040";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentForMalePetOwnerTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentForBranchTime" TIMESTAMP',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentForBranchTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentForMalePetOwnerTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionTime" TIMESTAMP',
    );
  }
}
