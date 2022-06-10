import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654832742708 implements MigrationInterface {
  name = "DBMigrate1654832742708";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD "realTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD "priority" integer',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP COLUMN "priority"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP COLUMN "realTime"',
    );
  }
}
