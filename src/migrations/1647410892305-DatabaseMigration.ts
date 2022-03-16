import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1647410892305 implements MigrationInterface {
  name = "DatabaseMigration1647410892305";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "refund" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-16T06:08:15.014Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-16\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "refund" SET NOT NULL',
    );
  }
}
