import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1648096645878 implements MigrationInterface {
  name = "DatabaseMigration1648096645878";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ADD "approveTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "cancelTime" TIMESTAMP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "cancelTime"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "approveTime"');
  }
}
