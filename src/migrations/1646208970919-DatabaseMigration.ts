import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646208970919 implements MigrationInterface {
  name = "DatabaseMigration1646208970919";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae"',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ALTER COLUMN "speciesId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "accountId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_4ea0245ad807c0126fa04f81184"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "orderId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "serviceId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_349122a174d037b373a87cae75e"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "healthRecordId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "serviceId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP CONSTRAINT "FK_21312c56826ceaed4a23dba5da9"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" DROP CONSTRAINT "FK_623a1166b26a92fa64563797e11"',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_d06de26f022c4c5f5368af8df28"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_6188cb109e89841c3234e21704f"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ALTER COLUMN "accountId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_e9ef19c423550d1fb5d19916846"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "staffId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "sellerId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_1d5a546d416b851ba79ffe69441"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_10f9ae0dc749135008086c39e8c"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "sellerId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "buyerId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" DROP CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ALTER COLUMN "petId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "categoryId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_986a439bb1abbd3bc0aaa50edf9"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_7082ab687c3de7a3bfbe28e91c5"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "petMaleId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "petFemaleId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "ownerMaleId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "ownerFemaleId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "roleId" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "meetingTime"');
    await queryRunner.query('ALTER TABLE "ticket" ADD "meetingTime" TIME');
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-02T08:16:13.805Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_4ea0245ad807c0126fa04f81184" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_349122a174d037b373a87cae75e" FOREIGN KEY ("healthRecordId") REFERENCES "health_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD CONSTRAINT "FK_21312c56826ceaed4a23dba5da9" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
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
    await queryRunner.query(
      'ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"',
    );
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
      'ALTER TABLE "health_record" DROP CONSTRAINT "FK_21312c56826ceaed4a23dba5da9"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP CONSTRAINT "FK_349122a174d037b373a87cae75e"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_4ea0245ad807c0126fa04f81184"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680"',
    );
    await queryRunner.query(
      'ALTER TABLE "category" DROP CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-01\'',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "meetingTime"');
    await queryRunner.query('ALTER TABLE "ticket" ADD "meetingTime" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "roleId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "ownerFemaleId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "ownerMaleId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "petFemaleId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "petMaleId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280" FOREIGN KEY ("ownerFemaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880" FOREIGN KEY ("ownerMaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_7082ab687c3de7a3bfbe28e91c5" FOREIGN KEY ("petFemaleId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_986a439bb1abbd3bc0aaa50edf9" FOREIGN KEY ("petMaleId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "categoryId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "buyerId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "sellerId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d" FOREIGN KEY ("buyerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_10f9ae0dc749135008086c39e8c" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_1d5a546d416b851ba79ffe69441" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "sellerId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "staffId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_e9ef19c423550d1fb5d19916846" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ALTER COLUMN "accountId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_6188cb109e89841c3234e21704f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_d06de26f022c4c5f5368af8df28" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ADD CONSTRAINT "FK_623a1166b26a92fa64563797e11" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ALTER COLUMN "petId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD CONSTRAINT "FK_21312c56826ceaed4a23dba5da9" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "serviceId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "healthRecordId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_c8421113a8f8d5f7f6ab54ad75d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD CONSTRAINT "FK_349122a174d037b373a87cae75e" FOREIGN KEY ("healthRecordId") REFERENCES "health_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "serviceId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "orderId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_4ea0245ad807c0126fa04f81184" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "accountId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ALTER COLUMN "speciesId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "FK_8e7ba39f226fcccb4b864c6bfae" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
