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

  async getList(
    table: string,
    field: string,
    value: string,
    conditionField: string,
  ): Promise<
    Array<{
      key: number;
      value: string;
      conditionField: boolean;
    }>
  > {
    const x = await this.entityManager.query(
      `select * from ${table} where ${table}."${field}" LIKE '%${value}%'`,
    );
    return x.map((data: Record<string, object>) => {
      return {
        key: data.id,
        value: data[field],
        conditionField: data[conditionField],
      };
    });
  }
}
