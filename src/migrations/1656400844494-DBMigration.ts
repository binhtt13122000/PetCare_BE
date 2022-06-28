import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigration1656400844494 implements MigrationInterface {
  name = "DBMigration1656400844494";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "startDate" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "endDate" TIMESTAMP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "endDate"',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "startDate"',
    );
  }
}
