import { MigrationInterface, QueryRunner } from "typeorm";

export class serviceFee1652252727789 implements MigrationInterface {
  name = "serviceFee1652252727789";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "service_fee" ("id" SERIAL NOT NULL, "min" integer, "max" integer, "price" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_70d082964aaa4bf193c2b1276e9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "health_service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "service" ALTER COLUMN "price" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-11T07:05:30.968Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "service_fee" ADD CONSTRAINT "FK_19dfe7052d89f4fd4fd4b9476dd" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service_fee" DROP CONSTRAINT "FK_19dfe7052d89f4fd4fd4b9476dd"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-07 08:07:56.853\'',
    );
    await queryRunner.query(
      'ALTER TABLE "service" ALTER COLUMN "price" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "price" integer NOT NULL',
    );
    await queryRunner.query('DROP TABLE "service_fee"');
  }
}
