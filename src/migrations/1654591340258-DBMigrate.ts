import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654591340258 implements MigrationInterface {
  name = "DBMigrate1654591340258";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_ca997555b20f4901d5fc6b7a374"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "breedingBranchId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_ca997555b20f4901d5fc6b7a374" FOREIGN KEY ("breedingBranchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_ca997555b20f4901d5fc6b7a374"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "breedingBranchId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_ca997555b20f4901d5fc6b7a374" FOREIGN KEY ("breedingBranchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
