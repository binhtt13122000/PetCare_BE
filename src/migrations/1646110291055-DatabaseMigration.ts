import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646110291055 implements MigrationInterface {
  name = "DatabaseMigration1646110291055";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "account" RENAME COLUMN "status" TO "isActive"',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "account" ADD "isActive" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-01T04:51:34.504Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-02-28\'',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "account" ADD "isActive" character varying NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" RENAME COLUMN "isActive" TO "status"',
    );
  }
}
