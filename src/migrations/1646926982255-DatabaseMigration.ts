import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646926982255 implements MigrationInterface {
  name = "DatabaseMigration1646926982255";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "petImage"');
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-10T15:43:05.294Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-08\'',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "petImage" text NOT NULL');
  }
}
