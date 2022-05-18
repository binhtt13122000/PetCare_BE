import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1652861433422 implements MigrationInterface {
  name = "DBMigrate1652861433422";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order" ADD "star" integer DEFAULT \'0\'',
    );
    await queryRunner.query('ALTER TABLE "order" ADD "review" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-18T08:10:37.120Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-18 07:29:02.404\'',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "review"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "star"');
  }
}
