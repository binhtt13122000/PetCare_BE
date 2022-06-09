import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654744551060 implements MigrationInterface {
  name = "DBMigrate1654744551060";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"combo_type_enum\" AS ENUM('NORMAL', 'VACCINE', 'BREED', 'PERIODICAL')",
    );
    await queryRunner.query(
      'ALTER TABLE "combo" ADD "type" "public"."combo_type_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD "breedingTransactionId" integer NOT NULL',
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
      'ALTER TABLE "pet_combo" DROP COLUMN "breedingTransactionId"',
    );
    await queryRunner.query('ALTER TABLE "combo" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."combo_type_enum"');
  }
}
