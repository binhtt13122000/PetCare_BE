import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1657269753575 implements MigrationInterface {
  name = "DBMigrate1657269753575";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" ADD "reasonCancel" text');
    await queryRunner.query('ALTER TABLE "order" ADD "cancelTime" TIMESTAMP');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "cancelTime"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "reasonCancel"');
  }
}
