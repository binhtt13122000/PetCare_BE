import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1657724700980 implements MigrationInterface {
  name = "DBMigrate1657724700980";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "startDate"',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "endDate"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "endDate" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "startDate" TIMESTAMP NOT NULL',
    );
  }
}
