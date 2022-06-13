import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655099812417 implements MigrationInterface {
  name = "DBMigrate1655099812417";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "health_pet_record" ("id" SERIAL NOT NULL, "dateOfInjection" TIMESTAMP NOT NULL, "description" text, "vaccineType" text, "type" text NOT NULL, "vaccineId" integer, "petId" integer NOT NULL, "branchId" integer NOT NULL, CONSTRAINT "PK_3d86d590040814d07ea36f9ef7c" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" ADD CONSTRAINT "FK_352b2fdc7f387ed56bb74a02f58" FOREIGN KEY ("vaccineId") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" ADD CONSTRAINT "FK_1176915addc0123cb83ffdb666c" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" ADD CONSTRAINT "FK_a0614c314a229ee3ea4e51e8a01" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('DROP TABLE "paper"');
    await queryRunner.query('DROP TABLE "vaccine_pet_record"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" DROP CONSTRAINT "FK_a0614c314a229ee3ea4e51e8a01"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" DROP CONSTRAINT "FK_1176915addc0123cb83ffdb666c"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_pet_record" DROP CONSTRAINT "FK_352b2fdc7f387ed56bb74a02f58"',
    );
    await queryRunner.query('DROP TABLE "health_pet_record"');
  }
}
