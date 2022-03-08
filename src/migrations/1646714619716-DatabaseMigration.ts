import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646714619716 implements MigrationInterface {
  name = "DatabaseMigration1646714619716";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-08T04:43:42.777Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-08\'',
    );
  }
}
