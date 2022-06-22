import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655862784714 implements MigrationInterface {
  name = "DBMigrate1655862784714";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "timeToCheckBreeding" TIMESTAMP',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "timeToCheckBreeding"',
    );
  }
}
