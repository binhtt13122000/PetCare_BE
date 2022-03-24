import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1648100106257 implements MigrationInterface {
  name = "DatabaseMigration1648100106257";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "approveTime" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "cancelTime" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "cancelTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "approveTime" SET NOT NULL',
    );
  }
}
