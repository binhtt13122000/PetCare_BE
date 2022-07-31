import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1659210389170 implements MigrationInterface {
  name = "DBMigrate1659210389170";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "startTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "endTime" TIMESTAMP',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "endTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" DROP COLUMN "startTime"',
    );
  }
}
