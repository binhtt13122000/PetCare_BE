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
  NORMAL = "NORMAL",
  IN_POST = "IN_POST",
}

export enum PostEnum {
  REQUESTED = "REQUESTED",
  REJECTED = "REJECTED",
  PUBLISHED = "PUBLISHED",
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  CANCELED = "CANCELED",
  // CLOSED = "CLOSED",
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
  BRANCH_MANAGER = "BRANCH_MANAGER",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum RoleIndexEnum {
  BRANCH_MANAGER = 2,
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

export enum PaymentOrderMethodEnum {
  CASH = "CASH",
  VNPAY = "VNPAY",
}

export enum TicketStatusEnum {
  CREATED = "CREATED",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
}

export enum OrderType {
  DESC = "DESC",
  ASC = "ASC",
}

export enum PostOrderName {
  BREEDNAME = "name",
  PROVISIONALTOTAL = "provisionalTotal",
  PRICE = "price",
}
