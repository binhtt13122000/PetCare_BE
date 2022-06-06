import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654503890148 implements MigrationInterface {
  name = "DBMigrate1654503890148";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "combo" ADD "name" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "combo" ADD CONSTRAINT "UQ_0ce9b7357b007cf83f8ec5886f9" UNIQUE ("name")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo" DROP CONSTRAINT "UQ_0ce9b7357b007cf83f8ec5886f9"',
    );
    await queryRunner.query('ALTER TABLE "combo" DROP COLUMN "name"');
  }
}
