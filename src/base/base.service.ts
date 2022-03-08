import { BaseEntity, DeleteResult, Repository } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
import { IBaseService } from "./i.base.service";

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  constructor(private readonly repository: R) {}

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(id: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.repository.findOne(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
