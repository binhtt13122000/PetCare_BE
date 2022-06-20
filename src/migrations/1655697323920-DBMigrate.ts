import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655697323920 implements MigrationInterface {
  name = "DBMigrate1655697323920";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "self" boolean DEFAULT false',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "meetingTime" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "meetingTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "self"',
    );
  }
}
