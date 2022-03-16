import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1647410171298 implements MigrationInterface {
  name = "DatabaseMigration1647410171298";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" ADD "refund" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-16T05:56:14.205Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-16\'',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "refund"');
  }
}
