import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653288547264 implements MigrationInterface {
  name = "DBMigrate1653288547264";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-23T06:49:10.881Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-23 04:19:56.652\'',
    );
    await queryRunner.query('ALTER TABLE "service" ADD "price" integer');
  }
}
