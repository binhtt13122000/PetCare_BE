import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1652858937335 implements MigrationInterface {
  name = "DBMigrate1652858937335";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-18T07:29:02.404Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-18 02:55:35.977\'',
    );
  }
}
