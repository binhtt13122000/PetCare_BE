import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654156291634 implements MigrationInterface {
  name = "DBMigrate1654156291634";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "customer" DROP COLUMN "numberFollowers"',
    );
    await queryRunner.query('DROP TABLE "follow"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "numberFollowers" integer DEFAULT \'0\'',
    );
  }
}
