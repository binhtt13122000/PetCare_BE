import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646013810382 implements MigrationInterface {
  name = "DatabaseMigration1646013810382";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "species" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "isActive" boolean NOT NULL, "isBreeding" boolean NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "isActive" boolean NOT NULL, "speciesId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "paper" ("id" SERIAL NOT NULL, "name" text NOT NULL, "date" date NOT NULL, "evidence" text NOT NULL, "type" text NOT NULL, "status" boolean NOT NULL DEFAULT true, "description" text NOT NULL, "petId" integer, CONSTRAINT "PK_ca8320a8e49e70e3de2d843a80a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "pet_owner" ("id" SERIAL NOT NULL, "isCurrentOwner" boolean NOT NULL DEFAULT true, "date" date NOT NULL, "petId" integer, "accountId" integer, CONSTRAINT "PK_5116a00f46dd9097ed6bd8dd6a5" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" text NOT NULL, "price" double precision NOT NULL, "deposit" double precision NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "effectiveTime" TIMESTAMP NOT NULL, "type" text NOT NULL, "description" text, "status" boolean NOT NULL DEFAULT true, "evidence" text NOT NULL, "petImage" text NOT NULL, "sellerContract" text, "petId" integer, "staffId" integer, "sellerId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "sale_transaction" ("id" SERIAL NOT NULL, "sellerContract" text, "buyerContract" text, "type" text NOT NULL, "totalPrice" double precision NOT NULL, "payForSeller" double precision NOT NULL, "deposit" double precision NOT NULL, "status" boolean NOT NULL DEFAULT true, "description" text, "payForSellerTime" TIMESTAMP, "payFromBuyerTime" TIMESTAMP, "petId" integer, "sellerId" integer, "buyerId" integer, CONSTRAINT "PK_06470e015a427563408e7e3661e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "vaccine" ("id" SERIAL NOT NULL, "name" text NOT NULL, "dateOfInjection" TIMESTAMP NOT NULL, "evidence" text NOT NULL, "description" text, "status" boolean NOT NULL DEFAULT true, "petId" integer, CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" text NOT NULL, "dob" date NOT NULL, "ageRange" integer, "isMale" boolean NOT NULL DEFAULT true, "description" text, "avatar" text NOT NULL, "isSeed" boolean NOT NULL DEFAULT true, "status" boolean NOT NULL DEFAULT true, "color" text, "bloodGroup" text, "categoryId" integer, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "health_record" ("id" SERIAL NOT NULL, "dateOfExam" date NOT NULL, "weight" double precision NOT NULL, "height" double precision NOT NULL, "totalPrice" double precision NOT NULL, "evidence" text NOT NULL, "description" text, "isPeriodical" boolean NOT NULL DEFAULT true, "promotion" double precision, "status" boolean NOT NULL DEFAULT true, "petId" integer, CONSTRAINT "PK_abe4a44118137fd49ab9edff372" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "health_service" ("id" SERIAL NOT NULL, "price" double precision NOT NULL, "date" date NOT NULL, "evidence" text NOT NULL, "description" text, "status" boolean NOT NULL DEFAULT true, "healthRecordId" integer, "serviceId" integer, CONSTRAINT "PK_bfabe3066e7ef1cf3e15ec913e9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" text NOT NULL, "price" double precision NOT NULL, "description" text, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "order_detail" ("id" SERIAL NOT NULL, "price" double precision NOT NULL, "date" date NOT NULL, "quantity" integer NOT NULL, "status" boolean NOT NULL DEFAULT true, "description" text, "orderId" integer, "serviceId" integer, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "order" ("id" SERIAL NOT NULL, "totalPrice" double precision NOT NULL, "status" boolean NOT NULL DEFAULT true, "description" text, "accountId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "phoneNumber" text NOT NULL, "address" text NOT NULL, "isMale" boolean NOT NULL, "registerTime" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "roleId" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "breeding_transaction" ("id" SERIAL NOT NULL, "totalPrice" double precision NOT NULL, "status" boolean NOT NULL DEFAULT false, "breedingContract" text, "dateOfBreeding" date, "deposit" double precision, "statusAfterUltrasound" boolean NOT NULL DEFAULT false, "evidenceBreeding" text, "evidenceAfterUltrasound" text, "dateOfUltrasound" date, "petMaleId" integer, "petFemaleId" integer, "ownerMaleId" integer, "ownerFemaleId" integer, CONSTRAINT "PK_df9d7e2763bb53a8abed45cabfd" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "media" ("id" SERIAL NOT NULL, "url" text NOT NULL, "type" text NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "promotion" ("id" SERIAL NOT NULL, "name" text NOT NULL, "promo" double precision NOT NULL, "startTime" date NOT NULL, "expireTime" date NOT NULL, "description" text, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "name" text NOT NULL, "phoneNumber" text NOT NULL, "email" text, "type" text NOT NULL, "title" text, "meetingTime" TIMESTAMP, "evidence" text NOT NULL, "date" date NOT NULL DEFAULT \'"2022-02-28T02:03:33.506Z"\', "description" text, "status" text NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "verification_center" ("id" SERIAL NOT NULL, "name" text NOT NULL, "status" boolean NOT NULL DEFAULT true, "description" text, CONSTRAINT "PK_d89f61a108135b9b55160b609ae" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ADD CONSTRAINT "FK_623a1166b26a92fa64563797e11" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_d06de26f022c4c5f5368af8df28" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_6188cb109e89841c3234e21704f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_e9ef19c423550d1fb5d19916846" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_1d5a546d416b851ba79ffe69441" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_10f9ae0dc749135008086c39e8c" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d" FOREIGN KEY ("buyerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD CONSTRAINT "FK_21312c56826ceaed4a23dba5da9" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_349122a174d037b373a87cae75e" FOREIGN KEY ("healthRecordId") REFERENCES "health_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_4ea0245ad807c0126fa04f81184" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_986a439bb1abbd3bc0aaa50edf9" FOREIGN KEY ("petMaleId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_7082ab687c3de7a3bfbe28e91c5" FOREIGN KEY ("petFemaleId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880" FOREIGN KEY ("ownerMaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280" FOREIGN KEY ("ownerFemaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_7082ab687c3de7a3bfbe28e91c5"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_986a439bb1abbd3bc0aaa50edf9"',
    );
    await queryRunner.query(
      'ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_4ea0245ad807c0126fa04f81184"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_349122a174d037b373a87cae75e"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP CONSTRAINT "FK_21312c56826ceaed4a23dba5da9"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" DROP CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_10f9ae0dc749135008086c39e8c"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_1d5a546d416b851ba79ffe69441"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_e9ef19c423550d1fb5d19916846"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_6188cb109e89841c3234e21704f"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_d06de26f022c4c5f5368af8df28"',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" DROP CONSTRAINT "FK_623a1166b26a92fa64563797e11"',
    );
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae"',
    );
    await queryRunner.query('DROP TABLE "verification_center"');
    await queryRunner.query('DROP TABLE "ticket"');
    await queryRunner.query('DROP TABLE "promotion"');
    await queryRunner.query('DROP TABLE "media"');
    await queryRunner.query('DROP TABLE "breeding_transaction"');
    await queryRunner.query('DROP TABLE "account"');
    await queryRunner.query('DROP TABLE "role"');
    await queryRunner.query('DROP TABLE "order"');
    await queryRunner.query('DROP TABLE "order_detail"');
    await queryRunner.query('DROP TABLE "service"');
    await queryRunner.query('DROP TABLE "health_service"');
    await queryRunner.query('DROP TABLE "health_record"');
    await queryRunner.query('DROP TABLE "pet"');
    await queryRunner.query('DROP TABLE "vaccine"');
    await queryRunner.query('DROP TABLE "sale_transaction"');
    await queryRunner.query('DROP TABLE "post"');
    await queryRunner.query('DROP TABLE "pet_owner"');
    await queryRunner.query('DROP TABLE "paper"');
    await queryRunner.query('DROP TABLE "category"');
    await queryRunner.query('DROP TABLE "species"');
  }
}
