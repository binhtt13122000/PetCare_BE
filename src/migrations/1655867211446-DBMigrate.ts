import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655867211446 implements MigrationInterface {
  name = "DBMigrate1655867211446";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "isSuccess" boolean',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "isSuccess"',
    );
  }
}
