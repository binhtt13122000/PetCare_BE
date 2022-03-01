import { DeleteResult } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store(data: any): Promise<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
