import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Paper } from "src/entities/paper.entity";
import { PapersRepository } from "./papers.repository";

@Injectable()
export class PapersService extends BaseService<Paper, PapersRepository> {
  constructor(private readonly papersRepository: PapersRepository) {
    super(papersRepository);
  }
}
