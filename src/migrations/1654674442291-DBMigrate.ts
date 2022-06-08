import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654674442291 implements MigrationInterface {
  name = "DBMigrate1654674442291";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "pet_combo_service" ("id" SERIAL NOT NULL, "workingTime" TIMESTAMP NOT NULL, "isCompleted" boolean DEFAULT false, "serviceId" integer NOT NULL, "petComboId" integer NOT NULL, CONSTRAINT "PK_b053751ae72b9f43e6a2b448868" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_combo_paymentmethod_enum\" AS ENUM('CASH', 'VNPAY')",
    );
    await queryRunner.query(
      'CREATE TABLE "pet_combo" ("id" SERIAL NOT NULL, "registerTime" TIMESTAMP NOT NULL, "isCompleted" boolean DEFAULT false, "paymentMethod" "public"."pet_combo_paymentmethod_enum", "orderTotal" integer NOT NULL, "point" integer, "petId" integer NOT NULL, "branchId" integer NOT NULL, "comboId" integer NOT NULL, CONSTRAINT "PK_c9cba53edfd9168278ca07cf4fc" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum" RENAME TO "breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum\" AS ENUM('CREATED', 'REQUESTED', 'CANCELED', 'REJECTED', 'PAYMENTED', 'BREEDING_FINISHED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum" USING "status"::"text"::"public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD CONSTRAINT "FK_6132e7154973939d103e360bc29" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" ADD CONSTRAINT "FK_f7edc59327a294ae28a22b1a56e" FOREIGN KEY ("petComboId") REFERENCES "pet_combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD CONSTRAINT "FK_2e2fa00fd9b96293ddf9f2bee88" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD CONSTRAINT "FK_b45b7945d57010c4d98c5ff4627" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" ADD CONSTRAINT "FK_be15f69d746cb146907b359f6cc" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP CONSTRAINT "FK_be15f69d746cb146907b359f6cc"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP CONSTRAINT "FK_b45b7945d57010c4d98c5ff4627"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo" DROP CONSTRAINT "FK_2e2fa00fd9b96293ddf9f2bee88"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP CONSTRAINT "FK_f7edc59327a294ae28a22b1a56e"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_combo_service" DROP CONSTRAINT "FK_6132e7154973939d103e360bc29"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum_old\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'PAYMENTED', 'BREEDING_FINISHED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum_old" USING "status"::"text"::"public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum_old" RENAME TO "breeding_transaction_status_enum"',
    );
    await queryRunner.query('DROP TABLE "pet_combo"');
    await queryRunner.query(
      'DROP TYPE "public"."pet_combo_paymentmethod_enum"',
    );
    await queryRunner.query('DROP TABLE "pet_combo_service"');
  }
}
