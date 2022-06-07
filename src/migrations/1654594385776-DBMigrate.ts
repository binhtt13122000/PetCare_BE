import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654594385776 implements MigrationInterface {
  name = "DBMigrate1654594385776";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo_service" ADD "isActive" boolean NOT NULL DEFAULT true',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo_service" DROP COLUMN "isActive"',
    );
  }
}
