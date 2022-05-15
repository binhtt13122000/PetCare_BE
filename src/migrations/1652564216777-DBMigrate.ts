import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1652564216777 implements MigrationInterface {
  name = "DBMigrate1652564216777";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_e13996dc416abb08641289fd4d9"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_43039fa6a2105c348a84d9f333d"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" RENAME COLUMN "staffId" TO "branchId"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" RENAME COLUMN "staffId" TO "branchId"',
    );
    await queryRunner.query(
      'CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "createdTime" TIMESTAMP NOT NULL DEFAULT now(), "meetingTime" TIMESTAMP NOT NULL, "branchId" integer NOT NULL, "customerId" integer NOT NULL, "status" "public"."ticket_status_enum" NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "branch" ("id" SERIAL NOT NULL, "email" text, "representativeName" text NOT NULL, "phoneNumber" text NOT NULL, "address" text, "lat" double precision, "lng" double precision, "image" text, "description" text, "star" double precision NOT NULL DEFAULT \'0\', "numberReviewers" integer DEFAULT \'0\', "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_9f57ac49a5c462f91634236b998" UNIQUE ("phoneNumber"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "staffId"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ADD "branchId" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "order" ADD "point" integer');
    await queryRunner.query('ALTER TABLE "order" ADD "payment" integer');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "branchId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "branchId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-14T21:37:00.179Z"\'',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "paymentMethod"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_paymentmethod_enum\" AS ENUM('CASH', 'VNPAY')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "paymentMethod" "public"."order_paymentmethod_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."pet_status_enum" RENAME TO "pet_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_status_enum\" AS ENUM('DELETED', 'NORMAL', 'IN_POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "status" TYPE "public"."pet_status_enum" USING "status"::"text"::"public"."pet_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."pet_status_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_772f6c9d5b02697c47ee9654f4b" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_3581f64322f6cbba283856374e2" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ADD CONSTRAINT "FK_5679a41f61ecc51dc46093b663b" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD CONSTRAINT "FK_ee8ffb8cfa112b04177dc5f285e" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD CONSTRAINT "FK_8932781487db15d1393b206482e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_9d915a5cee9e0cfdf0d7fc3c30a" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD CONSTRAINT "FK_3d98568f462af7213713b7c00fb" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('DROP TABLE "staff"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP CONSTRAINT "FK_3d98568f462af7213713b7c00fb"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_9d915a5cee9e0cfdf0d7fc3c30a"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" DROP CONSTRAINT "FK_8932781487db15d1393b206482e"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" DROP CONSTRAINT "FK_ee8ffb8cfa112b04177dc5f285e"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" DROP CONSTRAINT "FK_5679a41f61ecc51dc46093b663b"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_3581f64322f6cbba283856374e2"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_772f6c9d5b02697c47ee9654f4b"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_status_enum_old\" AS ENUM('DELETED', 'NOT_VERIFIED', 'VERIFIED', 'IN_POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "status" TYPE "public"."pet_status_enum_old" USING "status"::"text"::"public"."pet_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."pet_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."pet_status_enum_old" RENAME TO "pet_status_enum"',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "paymentMethod"');
    await queryRunner.query('DROP TYPE "public"."order_paymentmethod_enum"');
    await queryRunner.query('ALTER TABLE "order" ADD "paymentMethod" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-11 07:05:30.968\'',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "branchId"',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "branchId"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "payment"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "point"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" DROP COLUMN "branchId"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "staffId" integer NOT NULL',
    );
    await queryRunner.query('DROP TABLE "branch"');
    await queryRunner.query('DROP TABLE "ticket"');
    await queryRunner.query(
      'ALTER TABLE "post" RENAME COLUMN "branchId" TO "staffId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" RENAME COLUMN "branchId" TO "staffId"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_43039fa6a2105c348a84d9f333d" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_e13996dc416abb08641289fd4d9" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
