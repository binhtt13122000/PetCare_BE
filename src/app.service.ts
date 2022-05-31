import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async isExist(table: string, field: string, value: string): Promise<boolean> {
    const x = await this.entityManager.query(
      `select * from ${table} where ${table}."${field}" = '${value}'`,
    );
    return x && x.length > 0;
  }
}
