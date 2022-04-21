import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigration1650530385729 implements MigrationInterface {
  name = "DBMigration1650530385729";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-21T08:39:48.992Z"\'',
    );
    await queryRunner.query('DROP TABLE IF EXISTS "verification_center"');
    await queryRunner.query('DROP TABLE IF EXISTS "Breed"');
    await queryRunner.query('DROP TABLE IF EXISTS "ticket"');
    await queryRunner.query('DROP TABLE IF EXISTS "price_rule"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-21 06:14:55.635\'',
    );
  }
}
