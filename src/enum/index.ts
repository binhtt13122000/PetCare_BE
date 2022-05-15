export enum BreedingTransactionEnum {
  CREATED = "CREATED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
  PAYMENTED = "PAYMENTED",
  BREEDING_FINISHED = "BREEDING_FINISHED",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
}

export enum OrderEnum {
  SUCCESS = "SUCCESS",
  WAITING = "WAITING",
}

export enum PetEnum {
  DELETED = "DELETED",
  NOT_VERIFIED = "NOT_VERIFIED",
  VERIFIED = "VERIFIED",
  IN_POST = "IN_POST",
}

export enum PostEnum {
  REQUESTED = "REQUESTED",
  REJECTED = "REJECTED",
  PUBLISHED = "PUBLISHED",
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  CANCELED = "CANCELED",
  CLOSED = "CLOSED",
}

export enum SaleTransactionEnum {
  CREATED = "CREATED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
  SUCCESS = "SUCCESS",
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export enum ServiceEnum {
  PURCHASE = "PURCHASE",
  BREED = "BREED",
}

export enum PaperEnum {
  CERTIFICATE = "CERTIFICATE",
  PRIZE = "PRIZE",
}

export enum ReportEnum {
  APPROVE = "APPROVE",
  WAITING = "WAITING",
  REJECT = "REJECT",
}

export enum RoleEnum {
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum RoleIndexEnum {
  STAFF = 2,
  CUSTOMER = 3,
  ADMIN = 1,
}

export enum LoginStatusEnum {
  SUCCESS = "SUCCESS",
  BANNED = "BANNED",
  NEWER = "NEWER",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export enum OrderType {
  DESC = "DESC",
  ASC = "ASC",
}

export enum ServiceOrderName {
  ID = "id",
  NAME = "name",
}
