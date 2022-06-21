import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigration1655811496902 implements MigrationInterface {
  name = "DBMigration1655811496902";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "serviceFee" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "serviceFee" SET NOT NULL',
    );
  }
}
