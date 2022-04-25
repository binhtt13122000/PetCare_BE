import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1650900359391 implements MigrationInterface {
  name = "DBMigrate1650900359391";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" ADD "title" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-25T15:26:02.157Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "isVaccineInject" SET DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "isVaccineInject" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-25 02:49:52.991\'',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "title"');
  }
}
