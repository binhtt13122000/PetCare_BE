import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654846094570 implements MigrationInterface {
  name = "DBMigrate1654846094570";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD "isDraft" boolean DEFAULT true',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pet_combo" DROP COLUMN "isDraft"');
  }
}
