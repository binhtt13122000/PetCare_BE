import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655957229879 implements MigrationInterface {
  name = "DBMigrate1655957229879";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realDateOfBreeding" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realDateOfFinish" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "realTimeToCheckBreeding" TIMESTAMP',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realTimeToCheckBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realDateOfFinish"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "realDateOfBreeding"',
    );
  }
}
