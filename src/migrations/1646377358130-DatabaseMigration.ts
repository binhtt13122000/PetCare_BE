import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646377358130 implements MigrationInterface {
  name = "DatabaseMigration1646377358130";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-04T07:02:42.006Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-04\'',
    );
  }
}
