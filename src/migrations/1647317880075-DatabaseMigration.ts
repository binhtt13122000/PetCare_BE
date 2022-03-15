import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1647317880075 implements MigrationInterface {
  name = "DatabaseMigration1647317880075";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-15T04:18:03.031Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD CONSTRAINT "UQ_83537e357d4daadb857592f1d3e" UNIQUE ("phoneNumber")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "account" DROP CONSTRAINT "UQ_83537e357d4daadb857592f1d3e"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-10\'',
    );
  }
}
