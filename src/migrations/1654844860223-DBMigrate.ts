import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654844860223 implements MigrationInterface {
  name = "DBMigrate1654844860223";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD "star" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD "review" text',
    );
    await queryRunner.query('ALTER TABLE "ticket" ADD "reasonCancel" text');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "reasonCancel"');
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP COLUMN "review"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP COLUMN "star"',
    );
  }
}
