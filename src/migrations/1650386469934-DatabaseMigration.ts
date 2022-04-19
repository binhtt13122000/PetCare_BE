import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1650386469934 implements MigrationInterface {
  name = "DatabaseMigration1650386469934";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_572612609a0047593d3e2e454ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_02b49d9dbed7ff94ecfea3ca4cc"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_7fff5d77eb920541f2f64759769"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_5b40ace269197ed372578de58ea"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_44fa08145cedc1513f33ddc29f9"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_f868c1f023ebf1310864b7ab99f"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_27b0c7c0547302a8cdab8c99a5c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_10f9ae0dc749135008086c39e8c"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680"',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP CONSTRAINT "FK_c79d618f2dc8ec58fb2eb677e1e"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_6188cb109e89841c3234e21704f"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" DROP CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" RENAME COLUMN "accountId" TO "customerId"',
    );
    await queryRunner.query(
      'CREATE TABLE "staff" ("id" SERIAL NOT NULL, "start" double precision NOT NULL DEFAULT \'0\', "numberReviewers" integer DEFAULT \'0\', "accountId" integer NOT NULL, CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "follow" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followedId" integer NOT NULL, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"report_type_enum\" AS ENUM('APPROVE', 'WAITING', 'REJECT')",
    );
    await queryRunner.query(
      'CREATE TABLE "report" ("id" SERIAL NOT NULL, "description" text NOT NULL, "evidence" text, "type" "public"."report_type_enum" NOT NULL, "createdTime" TIMESTAMP NOT NULL DEFAULT now(), "reporterId" integer NOT NULL, "reportedUserId" integer NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "customer" ("id" SERIAL NOT NULL, "start" double precision NOT NULL DEFAULT \'0\', "point" integer DEFAULT \'0\', "numberFollowers" integer DEFAULT \'0\', "numberReviewers" integer DEFAULT \'0\', "bankName" text, "bankCode" text, "bankBranch" text, "accountId" integer NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "Breed" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "isActive" boolean NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_19d77b3ad50a8c11d125b7b9b3d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "vaccine_pet_record" ("id" SERIAL NOT NULL, "dateOfInjection" TIMESTAMP NOT NULL DEFAULT \'"2022-04-19T16:41:13.235Z"\', "description" text, "type" text NOT NULL, "vaccineId" integer NOT NULL, "petId" integer NOT NULL, CONSTRAINT "PK_a3d7cff46e2bd04c39b6cb76c66" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "transaction_fee" ("id" SERIAL NOT NULL, "min" integer, "max" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_bcee076d7199e0d45647c3b66e8" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "paper" DROP COLUMN "status"');
    await queryRunner.query('ALTER TABLE "order_detail" DROP COLUMN "date"');
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "quantity"',
    );
    await queryRunner.query('ALTER TABLE "order_detail" DROP COLUMN "status"');
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "status"');
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "postHeathCheckId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "saleTransactionSellerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "saleTransactionBuyerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "postSellerContractId"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "postEvidenceId"');
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "breedingTransactionSellerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "breedingTransactionBuyerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "breedingContract"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "evidenceBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "evidenceAfterUltrasound"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "dateOfUltrasound"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "ownerMaleId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "ownerFemaleId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "statusMalePet"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_statusmalepet_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "statusFemalePet"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_statusfemalepet_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "createTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "type"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "payForSellerTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "payFromBuyerTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "payForSeller"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "createTime"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "title"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "effectiveTime"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "price"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "deposit"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "refund"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "healthCheckTime"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "accountId"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "totalPrice"');
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "accountId"');
    await queryRunner.query(
      'ALTER TABLE "vaccine" DROP COLUMN "dateOfInjection"',
    );
    await queryRunner.query('ALTER TABLE "vaccine" DROP COLUMN "evidence"');
    await queryRunner.query('ALTER TABLE "vaccine" DROP COLUMN "status"');
    await queryRunner.query('ALTER TABLE "vaccine" DROP COLUMN "petId"');
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "bloodGroup"');
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "categoryId"');
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "evidence"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "description"',
    );
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "status"');
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "height"');
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "promotion"',
    );
    await queryRunner.query('ALTER TABLE "health_service" DROP COLUMN "date"');
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP COLUMN "description"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP COLUMN "status"',
    );
    await queryRunner.query('ALTER TABLE "account" ADD "avatar" text');
    await queryRunner.query(
      'ALTER TABLE "account" ADD "dateOfBirth" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "service" ADD "isHealthCheck" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "service" ADD "unit" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "media" ADD "postId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "createdTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "meetingTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "sellerReceive" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "serviceFee" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "discount" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "pickupMalePetTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "pickupFemalePetTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "evidence" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "description" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "paymentMethod" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "star" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "review" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "ownerPetMaleId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "ownerPetFemaleId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "staffId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "promotionId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "createdTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "meetingTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "placeMeeting" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "transactionTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "sellerReceive" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "transactionFee" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "discount" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "transactionTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "paymentMethod" text',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "star" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "sale_transaction" ADD "review" text');
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "promotionId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "sellerReceive" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "shopFee" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "rejectTime" TIMESTAMP');
    await queryRunner.query('ALTER TABLE "post" ADD "reasonReject" text');
    await queryRunner.query('ALTER TABLE "post" ADD "customerId" integer');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "orderTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "staffId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "promotionId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "customerId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "applyMoney" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "maxMoneyPromo" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "promotion" ADD "customerId" integer');
    await queryRunner.query(
      'ALTER TABLE "species" ADD "isInject" boolean NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "vaccine" ADD "origin" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD "isActive" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "pet" ADD "specialMarkings" text');
    await queryRunner.query('ALTER TABLE "pet" ADD "vaccineDescription" text');
    await queryRunner.query('ALTER TABLE "pet" ADD "breedId" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "nextHealthCheck" date',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "content" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "petStatus" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "content" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "petStatus" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "evidence" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "description" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "dateOfBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "dateOfBreeding" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "reasonCancel" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum" RENAME TO "breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'PAYMENTED', 'BREEDING_FINISHED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum" USING "status"::"text"::"public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "postId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_af006457683248f5e83792b695d"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "reasonCancel" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum" RENAME TO "sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'SUCCESS')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum" USING "status"::"text"::"public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "postId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."post_status_enum" RENAME TO "post_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_status_enum\" AS ENUM('REQUESTED', 'REJECTED', 'PUBLISHED', 'WAITING_FOR_PAYMENT', 'CANCELED', 'CLOSED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "status" TYPE "public"."post_status_enum" USING "status"::"text"::"public"."post_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."post_status_enum_old"');
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum\" AS ENUM('SUCCESS', 'WAITING')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "evidence" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_a104ce9c03ead93a2eabd150092" FOREIGN KEY ("ownerPetMaleId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_79519e0b75ac340c686755f905c" FOREIGN KEY ("ownerPetFemaleId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_e13996dc416abb08641289fd4d9" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_390f0903b50b7b649bee2c5bf69" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d" FOREIGN KEY ("buyerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_10f9ae0dc749135008086c39e8c" FOREIGN KEY ("sellerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_af006457683248f5e83792b695d" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a57034968c0d215bfbb2373d1c7" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_43039fa6a2105c348a84d9f333d" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD CONSTRAINT "FK_31978ae88936dc7ce25adf089fc" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "follow" ADD CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d" FOREIGN KEY ("followedId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "report" ADD CONSTRAINT "FK_253163ca85b927f62596606f6cc" FOREIGN KEY ("reporterId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "report" ADD CONSTRAINT "FK_9bcc42f31a07ba2ec734bfa7dd0" FOREIGN KEY ("reportedUserId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_ab2f8f5a7215f25bfaf2d44cded" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "Breed" ADD CONSTRAINT "FK_86239641b875a66cd82bebc7529" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ADD CONSTRAINT "FK_033ec8a471f00c5f0a979809b36" FOREIGN KEY ("vaccineId") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ADD CONSTRAINT "FK_80e7040b9fc4f9b2183386af765" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" DROP CONSTRAINT "FK_80e7040b9fc4f9b2183386af765"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" DROP CONSTRAINT "FK_033ec8a471f00c5f0a979809b36"',
    );
    await queryRunner.query(
      'ALTER TABLE "Breed" DROP CONSTRAINT "FK_86239641b875a66cd82bebc7529"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_ab2f8f5a7215f25bfaf2d44cded"',
    );
    await queryRunner.query(
      'ALTER TABLE "report" DROP CONSTRAINT "FK_9bcc42f31a07ba2ec734bfa7dd0"',
    );
    await queryRunner.query(
      'ALTER TABLE "report" DROP CONSTRAINT "FK_253163ca85b927f62596606f6cc"',
    );
    await queryRunner.query(
      'ALTER TABLE "follow" DROP CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d"',
    );
    await queryRunner.query(
      'ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP CONSTRAINT "FK_31978ae88936dc7ce25adf089fc"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_43039fa6a2105c348a84d9f333d"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a57034968c0d215bfbb2373d1c7"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_af006457683248f5e83792b695d"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_10f9ae0dc749135008086c39e8c"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_390f0903b50b7b649bee2c5bf69"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_e13996dc416abb08641289fd4d9"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_79519e0b75ac340c686755f905c"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_a104ce9c03ead93a2eabd150092"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ALTER COLUMN "evidence" SET NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum_old\" AS ENUM('SUCCESS', 'INFORMATION_ERROR', 'BILLING_ERROR')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_status_enum_old\" AS ENUM('REQUESTED', 'CANCELED', 'PUBLISHED', 'EXPIRED', 'DEPOSITED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "status" TYPE "public"."post_status_enum_old" USING "status"::"text"::"public"."post_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."post_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."post_status_enum_old" RENAME TO "post_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "postId" DROP NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum_old\" AS ENUM('PET_AVAILABLE', 'NOT_PET_AVAILABLE', 'RECEIVED', 'NOT_RECEIVED', 'PAID')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum_old" USING "status"::"text"::"public"."sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum_old" RENAME TO "sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "reasonCancel" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_af006457683248f5e83792b695d" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "postId" DROP NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum_old\" AS ENUM('CANCEL', 'NOT_STARTED', 'PAYMENTED', 'PROCESSING', 'FINISHED', 'WAITING', 'NOT_ULTRASOUND', 'PREGNANT', 'NOT_PREGNANT')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum_old" USING "status"::"text"::"public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" SET DEFAULT \'NOT_STARTED\'',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum_old" RENAME TO "breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "reasonCancel" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "dateOfBreeding"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "dateOfBreeding" date',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "description" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ALTER COLUMN "evidence" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP COLUMN "petStatus"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" DROP COLUMN "content"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "petStatus"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "content"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "nextHealthCheck"',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "breedId"');
    await queryRunner.query(
      'ALTER TABLE "pet" DROP COLUMN "vaccineDescription"',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "specialMarkings"');
    await queryRunner.query('ALTER TABLE "vaccine" DROP COLUMN "isActive"');
    await queryRunner.query('ALTER TABLE "vaccine" DROP COLUMN "origin"');
    await queryRunner.query('ALTER TABLE "species" DROP COLUMN "isInject"');
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "customerId"');
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP COLUMN "maxMoneyPromo"',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "applyMoney"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "customerId"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "promotionId"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "staffId"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "orderTotal"');
    await queryRunner.query(
      'ALTER TABLE "order" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "customerId"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "reasonReject"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "rejectTime"');
    await queryRunner.query(
      'ALTER TABLE "post" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "shopFee"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "sellerReceive"');
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "promotionId"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "review"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "star"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "paymentMethod"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "transactionTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "discount"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "transactionFee"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "sellerReceive"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "transactionTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "placeMeeting"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "meetingTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "createdTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "promotionId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "staffId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "ownerPetFemaleId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "ownerPetMaleId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "review"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "star"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "paymentMethod"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "description"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "evidence"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "pickupFemalePetTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "pickupMalePetTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "discount"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "serviceFee"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "sellerReceive"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "meetingTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "createdTime"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "postId"');
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "unit"');
    await queryRunner.query(
      'ALTER TABLE "service" DROP COLUMN "isHealthCheck"',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "dateOfBirth"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "avatar"');
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "description" text',
    );
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "date" date NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "promotion" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "height" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "description" text',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "evidence" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD "categoryId" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet" ADD "bloodGroup" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD "petId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD "evidence" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD "dateOfInjection" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "promotion" ADD "accountId" integer');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "accountId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "healthCheckTime" TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "refund" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "deposit" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "price" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "effectiveTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "title" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "createTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "deposit" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "payForSeller" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "payFromBuyerTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "payForSellerTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "type" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "createTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_statusfemalepet_enum\" AS ENUM('CANCELED', 'NOT_AVAILABLE', 'AVAILABLE', 'READY', 'NOT_READY', 'RETURNED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "statusFemalePet" "public"."breeding_transaction_statusfemalepet_enum" NOT NULL DEFAULT \'NOT_AVAILABLE\'',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_statusmalepet_enum\" AS ENUM('CANCELED', 'NOT_AVAILABLE', 'AVAILABLE', 'READY', 'NOT_READY', 'RETURNED', 'PAYMENT')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "statusMalePet" "public"."breeding_transaction_statusmalepet_enum" NOT NULL DEFAULT \'NOT_AVAILABLE\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "deposit" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "ownerFemaleId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "ownerMaleId" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "dateOfUltrasound" date',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "evidenceAfterUltrasound" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "evidenceBreeding" text',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "breedingContract" text',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "breedingTransactionBuyerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "breedingTransactionSellerContractId" integer',
    );
    await queryRunner.query('ALTER TABLE "media" ADD "postEvidenceId" integer');
    await queryRunner.query(
      'ALTER TABLE "media" ADD "postSellerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "saleTransactionBuyerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "saleTransactionSellerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "postHeathCheckId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "quantity" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "date" date NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ADD "status" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('DROP TABLE "transaction_fee"');
    await queryRunner.query('DROP TABLE "vaccine_pet_record"');
    await queryRunner.query('DROP TABLE "Breed"');
    await queryRunner.query('DROP TABLE "customer"');
    await queryRunner.query('DROP TABLE "report"');
    await queryRunner.query('DROP TYPE "public"."report_type_enum"');
    await queryRunner.query('DROP TABLE "follow"');
    await queryRunner.query('DROP TABLE "staff"');
    await queryRunner.query(
      'ALTER TABLE "pet_owner" RENAME COLUMN "customerId" TO "accountId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_6188cb109e89841c3234e21704f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD CONSTRAINT "FK_c79d618f2dc8ec58fb2eb677e1e" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_d4ecdda0f9ba20b6332e6a7fe7a" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_10f9ae0dc749135008086c39e8c" FOREIGN KEY ("sellerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a484b1bc62be209b3a1919e0f0d" FOREIGN KEY ("buyerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_27f187d416c3cfb6b2b4ceda880" FOREIGN KEY ("ownerMaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_daf8eb9042d05a76ebacb5b1280" FOREIGN KEY ("ownerFemaleId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_27b0c7c0547302a8cdab8c99a5c" FOREIGN KEY ("saleTransactionBuyerContractId") REFERENCES "sale_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_f868c1f023ebf1310864b7ab99f" FOREIGN KEY ("saleTransactionSellerContractId") REFERENCES "sale_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_44fa08145cedc1513f33ddc29f9" FOREIGN KEY ("postHeathCheckId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_5b40ace269197ed372578de58ea" FOREIGN KEY ("postEvidenceId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_7fff5d77eb920541f2f64759769" FOREIGN KEY ("postSellerContractId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_02b49d9dbed7ff94ecfea3ca4cc" FOREIGN KEY ("breedingTransactionSellerContractId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_572612609a0047593d3e2e454ad" FOREIGN KEY ("breedingTransactionBuyerContractId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
