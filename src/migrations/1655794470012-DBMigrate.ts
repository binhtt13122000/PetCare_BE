import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655794470012 implements MigrationInterface {
  name = "DBMigrate1655794470012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "servicePoint" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD "evidence" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "postId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "postId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP COLUMN "evidence"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "servicePoint"',
    );
  }
}
