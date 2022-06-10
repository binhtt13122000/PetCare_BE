import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654825692781 implements MigrationInterface {
  name = "DBMigrate1654825692781";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP CONSTRAINT "FK_45b596bcf98aa6e906db130e251"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ALTER COLUMN "breedingTransactionId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD CONSTRAINT "FK_45b596bcf98aa6e906db130e251" FOREIGN KEY ("breedingTransactionId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP CONSTRAINT "FK_45b596bcf98aa6e906db130e251"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ALTER COLUMN "breedingTransactionId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD CONSTRAINT "FK_45b596bcf98aa6e906db130e251" FOREIGN KEY ("breedingTransactionId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
