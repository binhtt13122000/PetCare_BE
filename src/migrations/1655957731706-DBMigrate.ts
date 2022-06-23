import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655957731706 implements MigrationInterface {
  name = "DBMigrate1655957731706";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "starBranch" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "reviewBranch" text',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "reviewBranch"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "starBranch"',
    );
  }
}
